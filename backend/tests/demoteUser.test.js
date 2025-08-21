const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

// Mocking Prisma and JWT
jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});
jest.mock('jsonwebtoken');

describe('Demote User Controller', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('PATCH /api/user/demote/:id', () => {
    it('devrait rétrograder un utilisateur avec succès si appelé par un admin', async () => {
      // Arrange: Mock token verification for an admin user
      jwt.verify.mockReturnValue({ userId: 1, userType: 'admin' });
      // Arrange: Mock the database call within the isAdmin middleware
      prisma.user.findUnique.mockResolvedValue({ user_id: 1, user_type: 'admin' });

      const targetUserId = 2;
      const demotedUser = {
        user_id: targetUserId,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        user_type: 'user',
      };
      // Arrange: Mock the database call within the controller
      prisma.user.update.mockResolvedValue(demotedUser);

      // Act
      const res = await request(app)
        .patch(`/api/user/demote/${targetUserId}`)
        .set('Authorization', 'Bearer fake-admin-token');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Administrateur rétrogradé en utilisateur avec succès');
      expect(res.body.user.user_type).toBe('user');
    });

    it('devrait retourner une erreur 500 si la mise à jour de l\'utilisateur échoue', async () => {
      // Arrange: Mock token verification for an admin user
      jwt.verify.mockReturnValue({ userId: 1, userType: 'admin' });
      // Arrange: Mock the database call within the isAdmin middleware
      prisma.user.findUnique.mockResolvedValue({ user_id: 1, user_type: 'admin' });
      // Arrange: Mock the update call to throw an error
      prisma.user.update.mockRejectedValue(new Error('Database error'));

      // Act
      const res = await request(app)
        .patch('/api/user/demote/999')
        .set('Authorization', 'Bearer fake-admin-token');

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur lors de la rétrogradation');
    });

    it('devrait retourner une erreur 403 si appelé par un non-admin', async () => {
      // Arrange: Mock token verification for a non-admin user
      jwt.verify.mockReturnValue({ userId: 2, userType: 'user' });
      // Arrange: Mock the database call in isAdmin to reflect the non-admin role
      prisma.user.findUnique.mockResolvedValue({ user_id: 2, user_type: 'user' });

      // Act
      const res = await request(app)
        .patch('/api/user/demote/3')
        .set('Authorization', 'Bearer fake-user-token');

      // Assert
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', "Accès refusé, admin uniquement");
    });

    it('devrait retourner une erreur 500 si le middleware isAdmin ne trouve pas l\'utilisateur', async () => {
      // Arrange: Mock token verification
      jwt.verify.mockReturnValue({ userId: 1, userType: 'admin' });
      // Arrange: Mock the DB call in isAdmin to find nothing
      prisma.user.findUnique.mockResolvedValue(null);

      // Act
      const res = await request(app)
        .patch('/api/user/demote/2')
        .set('Authorization', 'Bearer fake-admin-token');

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Erreur serveur');
    });
  });
});
