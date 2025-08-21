const request = require('supertest');
const app = require('../src/app');
const getUserService = require('../src/services/getUser'); // Import the service
const jwt = require('jsonwebtoken');

// Mock the entire getUser service
jest.mock('../src/services/getUser', () => ({
  getUser: jest.fn(),
  getAllUsers: jest.fn(),
}));

// Mock jsonwebtoken for middleware
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('User Profile Controller', () => {
  const mockUserId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    jwt.verify.mockReturnValue({ userId: mockUserId }); // Mock a valid token by default
  });

  describe('GET /api/profil', () => {
    it('devrait retourner le profil de l\'utilisateur connecté', async () => {
      const mockUser = { user_id: mockUserId, first_name: 'John', email: 'john@example.com' };
      getUserService.getUser.mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/profil')
        .set('Authorization', 'Bearer fake-token');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUser);
      expect(getUserService.getUser).toHaveBeenCalledWith(mockUserId);
    });

    it('devrait retourner 404 si l\'utilisateur n\'est pas trouvé', async () => {
      getUserService.getUser.mockRejectedValue(new Error('Utilisateur non trouvé'));

      const res = await request(app)
        .get('/api/profil')
        .set('Authorization', 'Bearer fake-token');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Utilisateur non trouvé');
    });

    it('devrait retourner 500 en cas d\'erreur serveur', async () => {
      getUserService.getUser.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .get('/api/profil')
        .set('Authorization', 'Bearer fake-token');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur');
    });

    it('devrait retourner 401 si aucun token n\'est fourni', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

      const res = await request(app).get('/api/profil');

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Token manquant ou invalide');
    });
  });

  describe('GET /api/users', () => {
    it('devrait retourner tous les utilisateurs', async () => {
      const mockUsers = [{ user_id: 1, email: 'user1@example.com' }, { user_id: 2, email: 'user2@example.com' }];
      getUserService.getAllUsers.mockResolvedValue(mockUsers);

      const res = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer fake-token'); // Assuming this route also requires auth

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockUsers);
      expect(getUserService.getAllUsers).toHaveBeenCalled();
    });

    it('devrait retourner 500 en cas d\'erreur serveur lors de la récupération de tous les utilisateurs', async () => {
      getUserService.getAllUsers.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer fake-token');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur');
    });
  });
});