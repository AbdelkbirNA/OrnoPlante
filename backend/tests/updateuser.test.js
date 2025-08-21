const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock Prisma, bcryptjs, and jsonwebtoken
jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Require app AFTER mocks are set up
const app = require('../src/app');

describe('User Update Controller', () => {
  let prisma;
  const mockUserId = 1;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
    jwt.verify.mockReturnValue({ userId: mockUserId }); // Mock a valid token by default
  });

  describe('PATCH /api/user/update', () => {
    it('devrait mettre à jour le profil utilisateur avec succès', async () => {
      const updatedUserData = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
      };
      prisma.user.update.mockResolvedValue({ user_id: mockUserId, ...updatedUserData, profile_picture: null });

      const res = await request(app)
        .put('/api/user/update')
        .set('Authorization', 'Bearer fake-token')
        .send(updatedUserData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user_id', mockUserId);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
        data: {
          first_name: updatedUserData.first_name,
          last_name: updatedUserData.last_name,
          email: updatedUserData.email,
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          user_type: true,
          registration_date: true,
          profile_picture: true,
        },
      });
    });

    it('devrait mettre à jour le profil utilisateur avec une nouvelle photo', async () => {
      const updatedUserData = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
      };
      prisma.user.update.mockResolvedValue({ user_id: mockUserId, ...updatedUserData, profile_picture: '/uploads/users/new_pic.jpg' });

      const res = await request(app)
        .put('/api/user/update')
        .set('Authorization', 'Bearer fake-token')
        .field('first_name', updatedUserData.first_name)
        .field('last_name', updatedUserData.last_name)
        .field('email', updatedUserData.email)
        .attach('profile_picture_file', 'tests/test_image.jpg'); // Assuming a dummy image

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user_id', mockUserId);
      expect(prisma.user.update).toHaveBeenCalled(); // Check if update was called
    });

    it('devrait retourner 500 si la mise à jour échoue', async () => {
      prisma.user.update.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .put('/api/user/update')
        .set('Authorization', 'Bearer fake-token')
        .send({ first_name: 'Jane' });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur lors de la mise à jour');
    });

    it('devrait retourner 401 si aucun token n\'est fourni', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

      const res = await request(app).put('/api/user/update').send({});

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Token manquant ou invalide');
    });
  });

  describe('PATCH /api/user/change-password', () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword123';
    const hashedPassword = 'hashedOldPassword';

    it('devrait changer le mot de passe avec succès', async () => {
      prisma.user.findUnique.mockResolvedValue({ user_id: mockUserId, password: hashedPassword });
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('hashedNewPassword');
      prisma.user.update.mockResolvedValue({});

      const res = await request(app)
        .patch('/api/user/change-password')
        .set('Authorization', 'Bearer fake-token')
        .send({
          oldPassword,
          newPassword,
          confirmPassword: newPassword,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Mot de passe mis à jour avec succès.');
      expect(bcrypt.compare).toHaveBeenCalledWith(oldPassword, hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
        data: { password: 'hashedNewPassword' },
      });
    });

    it('devrait retourner 400 si les champs sont manquants', async () => {
      const res = await request(app)
        .patch('/api/user/change-password')
        .set('Authorization', 'Bearer fake-token')
        .send({ newPassword: 'newPassword123' }); // oldPassword and confirmPassword missing

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Tous les champs sont obligatoires.');
    });

    it('devrait retourner 400 si les nouveaux mots de passe ne correspondent pas', async () => {
      const res = await request(app)
        .patch('/api/user/change-password')
        .set('Authorization', 'Bearer fake-token')
        .send({
          oldPassword,
          newPassword,
          confirmPassword: 'mismatch',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Le nouveau mot de passe et sa confirmation ne correspondent pas.');
    });

    it('devrait retourner 401 si l\'ancien mot de passe est incorrect', async () => {
      prisma.user.findUnique.mockResolvedValue({ user_id: mockUserId, password: hashedPassword });
      bcrypt.compare.mockResolvedValue(false); // Incorrect old password

      const res = await request(app)
        .patch('/api/user/change-password')
        .set('Authorization', 'Bearer fake-token')
        .send({
          oldPassword,
          newPassword,
          confirmPassword: newPassword,
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'L\'ancien mot de passe est incorrect.');
    });

    it('devrait retourner 500 en cas d\'erreur serveur', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .patch('/api/user/change-password')
        .set('Authorization', 'Bearer fake-token')
        .send({
          oldPassword,
          newPassword,
          confirmPassword: newPassword,
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur lors de la mise à jour du mot de passe.');
    });
  });
});