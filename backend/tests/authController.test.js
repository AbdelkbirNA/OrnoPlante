const request = require('supertest');
const app = require('../src/app'); // Assurez-vous que app.js exporte l'application express
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock des dépendances
jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Auth Controller', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  // --- Tests pour l'inscription (Register) ---
  describe('POST /api/register', () => {
    it('devrait créer un nouvel utilisateur avec succès', async () => {
      // Mock: l'email n'existe pas
      prisma.user.findUnique.mockResolvedValue(null);
      // Mock: le hashage du mot de passe
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      // Mock: la création de l'utilisateur
      prisma.user.create.mockResolvedValue({
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      });

      const res = await request(app)
        .post('/api/register')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirm_password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès');
      expect(res.body).toHaveProperty('userId', 1);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          password: 'hashedPassword123',
          user_type: 'user',
        },
      });
    });

    it('devrait retourner une erreur 400 si l\'email existe déjà', async () => {
      // Mock: l'email existe
      prisma.user.findUnique.mockResolvedValue({ email: 'john.doe@example.com' });

      const res = await request(app)
        .post('/api/register')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirm_password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Email déjà utilisé');
    });

    it('devrait retourner une erreur 400 si les mots de passe ne correspondent pas', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirm_password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Les mots de passe ne correspondent pas');
    });
  });

  // --- Tests pour la connexion (Login) ---
  describe('POST /api/login', () => {
    it('devrait connecter un utilisateur avec succès et retourner un token', async () => {
      const mockUser = {
        user_id: 1,
        email: 'test@example.com',
        password: 'hashedPassword123',
        user_type: 'user',
      };
      // Mock: l'utilisateur est trouvé
      prisma.user.findUnique.mockResolvedValue(mockUser);
      // Mock: la comparaison de mot de passe est valide
      bcrypt.compare.mockResolvedValue(true);
      // Mock: la signature du token
      jwt.sign.mockReturnValue('fake-jwt-token');

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Connexion réussie');
      expect(res.body).toHaveProperty('token', 'fake-jwt-token');
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.user_id, userType: mockUser.user_type },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
    });

    it('devrait retourner une erreur 401 si l\'email est incorrect', async () => {
      // Mock: l'utilisateur n'est pas trouvé
      prisma.user.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Email incorrect');
    });

    it('devrait retourner une erreur 401 si le mot de passe est incorrect', async () => {
      const mockUser = {
        user_id: 1,
        email: 'test@example.com',
        password: 'hashedPassword123',
      };
      // Mock: l'utilisateur est trouvé
      prisma.user.findUnique.mockResolvedValue(mockUser);
      // Mock: la comparaison de mot de passe est invalide
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Mot de passe incorrect');
    });
  });
});