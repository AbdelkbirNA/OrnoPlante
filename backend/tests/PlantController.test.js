const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client', () => {
  const mPrisma = {
    plant: {
      delete: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Plant Controller', () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('DELETE /api/plants/:id', () => {
    it('devrait supprimer une plante avec succès', async () => {
      prisma.plant.delete.mockResolvedValue({ plant_id: 1, plant_name: 'Test Plant' });

      const res = await request(app).delete('/api/plant/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Plante supprimée avec succès.');
      expect(prisma.plant.delete).toHaveBeenCalledWith({
        where: { plant_id: 1 },
      });
    });

    it('devrait retourner 500 si la suppression échoue', async () => {
      prisma.plant.delete.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).delete('/api/plant/1');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur lors de la suppression de la plante.');
    });
  });

  describe('POST /api/plants', () => {
    it('devrait ajouter une nouvelle plante avec succès', async () => {
      const mockPlantData = {
        plant_name: 'New Plant',
        description: 'Description of new plant',
        type: 'Indoor',
        light_requirement: 'High',
        watering_frequency: 'Daily',
        temperature_min: 20,
        temperature_max: 30,
      };
      prisma.plant.create.mockResolvedValue({ plant_id: 1, ...mockPlantData, photo_url: '/uploads/plants/test.jpg' });

      const res = await request(app)
        .post('/api/addplant')
        .field('plant_name', mockPlantData.plant_name)
        .field('description', mockPlantData.description)
        .field('type', mockPlantData.type)
        .field('light_requirement', mockPlantData.light_requirement)
        .field('watering_frequency', mockPlantData.watering_frequency)
        .field('temperature_min', mockPlantData.temperature_min)
        .field('temperature_max', mockPlantData.temperature_max)
        .attach('image', 'tests/test_image.jpg'); // Assuming you have a dummy image for testing

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Plante ajoutée avec succès.');
      expect(prisma.plant.create).toHaveBeenCalled();
    });

    it('devrait retourner 500 si l\'ajout de la plante échoue', async () => {
      prisma.plant.create.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .post('/api/addplant')
        .send({
          plant_name: 'New Plant',
          description: 'Description of new plant',
          type: 'Indoor',
          light_requirement: 'High',
          watering_frequency: 'Daily',
          temperature_min: 20,
          temperature_max: 30,
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur lors de l\'ajout de la plante.');
    });
  });
});