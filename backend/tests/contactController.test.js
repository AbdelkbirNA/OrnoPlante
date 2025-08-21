const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client', () => {
  const mPrisma = {
    contactMessage: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Contact Controller', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    it('devrait créer un nouveau message de contact avec succès', async () => {
      prisma.contactMessage.create.mockResolvedValue({
        contact_id: 1,
        contact_type: 'General',
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      });

      const res = await request(app)
        .post('/api/contact')
        .send({
          contactType: 'General',
          name: 'John Doe',
          email: 'john.doe@example.com',
          subject: 'Test Subject',
          message: 'Test Message',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Message enregistré');
      expect(prisma.contactMessage.create).toHaveBeenCalled();
    });

    it('devrait retourner une erreur 400 si des champs obligatoires sont manquants', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          contactType: 'General',
          name: 'John Doe',
          email: 'john.doe@example.com',
          // subject and message are missing
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Champs obligatoires manquants');
    });

    it('devrait retourner une erreur 500 si la création du message échoue', async () => {
      prisma.contactMessage.create.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .post('/api/contact')
        .send({
          contactType: 'General',
          name: 'John Doe',
          email: 'john.doe@example.com',
          subject: 'Test Subject',
          message: 'Test Message',
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur');
    });
  });

  describe('GET /api/contact', () => {
    it('devrait retourner tous les messages de contact', async () => {
      const mockMessages = [
        { contact_id: 1, subject: 'Test 1' },
        { contact_id: 2, subject: 'Test 2' },
      ];
      prisma.contactMessage.findMany.mockResolvedValue(mockMessages);

      const res = await request(app)
        .get('/api/contact');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockMessages);
      expect(prisma.contactMessage.findMany).toHaveBeenCalled();
    });

    it('devrait retourner une erreur 500 si la récupération des messages échoue', async () => {
      prisma.contactMessage.findMany.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .get('/api/contact');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur lors de la récupération des messages');
    });
  });
});