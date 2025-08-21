const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

// Mock Prisma and JWT
jest.mock('@prisma/client', () => {
  const mPrisma = {
    favorite: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});
jest.mock('jsonwebtoken');

describe('Favorite Controller', () => {
  let prisma;
  const mockUserId = 1;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
    // Default mock for a valid user token
    jwt.verify.mockReturnValue({ userId: mockUserId });
  });

  describe('POST /api/favorites/add', () => {
    it('devrait ajouter une plante aux favoris', async () => {
      const plantId = 10;
      prisma.favorite.findUnique.mockResolvedValue(null);
      prisma.favorite.create.mockResolvedValue({ user_id: mockUserId, plant_id: plantId });

      const res = await request(app)
        .post('/api/favorites/add')
        .set('Authorization', 'Bearer fake-token')
        .send({ plantId });

      expect(res.statusCode).toEqual(201);
      expect(prisma.favorite.create).toHaveBeenCalledWith({
        data: { user_id: mockUserId, plant_id: plantId },
      });
    });

    it('devrait retourner une erreur 409 si la plante est déjà en favori', async () => {
      const plantId = 10;
      prisma.favorite.findUnique.mockResolvedValue({ user_id: mockUserId, plant_id: plantId });

      const res = await request(app)
        .post('/api/favorites/add')
        .set('Authorization', 'Bearer fake-token')
        .send({ plantId });

      expect(res.statusCode).toEqual(409);
      expect(prisma.favorite.create).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/favorites/remove', () => {
    it('devrait supprimer une plante des favoris', async () => {
      const plantId = 10;
      prisma.favorite.delete.mockResolvedValue({});

      const res = await request(app)
        .delete('/api/favorites/remove')
        .set('Authorization', 'Bearer fake-token')
        .send({ plantId });

      expect(res.statusCode).toEqual(200);
      expect(prisma.favorite.delete).toHaveBeenCalledWith({
        where: {
          user_id_plant_id: {
            user_id: mockUserId,
            plant_id: plantId,
          },
        },
      });
    });
  });

  describe('GET /api/favorites', () => {
    it('devrait retourner la liste des plantes favorites', async () => {
      const mockFavorites = [
        { user_id: mockUserId, plant_id: 1, plant: { plant_id: 1, name: 'Rose' } },
        { user_id: mockUserId, plant_id: 2, plant: { plant_id: 2, name: 'Tulipe' } },
      ];
      prisma.favorite.findMany.mockResolvedValue(mockFavorites);

      const res = await request(app)
        .get('/api/favorites')
        .set('Authorization', 'Bearer fake-token');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([
        { plant_id: 1, name: 'Rose' },
        { plant_id: 2, name: 'Tulipe' },
      ]);
    });

    it('devrait retourner une erreur 500 si la recherche échoue', async () => {
        prisma.favorite.findMany.mockRejectedValue(new Error('DB Error'));

        const res = await request(app)
            .get('/api/favorites')
            .set('Authorization', 'Bearer fake-token');

        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('message', 'Erreur serveur lors de la récupération des favoris.');
    });
  });

  describe('Authentication', () => {
    it('devrait retourner une erreur 401 si aucun token n\'est fourni', async () => {
        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        const res = await request(app).get('/api/favorites'); // No auth header

        // The middleware should catch the error from jwt.verify and return 401
        // Or in this case, since no header is sent, it returns 401 directly.
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Token manquant ou invalide');
    });
  });
});
