const request = require('supertest');
const app = require('../src/app');
const getPlantService = require('../src/services/getPlant'); // Import the service

// Mock the entire getPlant service
jest.mock('../src/services/getPlant', () => ({
  getPlant: jest.fn(),
  getAllPlants: jest.fn(),
}));

describe('Plant Profile Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/plants/:id', () => {
    it('devrait retourner une plante par ID', async () => {
      const mockPlant = { plant_id: 1, plant_name: 'Rose' };
      getPlantService.getPlant.mockResolvedValue(mockPlant);

      const res = await request(app).get('/api/plant/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockPlant);
      expect(getPlantService.getPlant).toHaveBeenCalledWith(1);
    });

    it('devrait retourner 404 si la plante n\'est pas trouvée', async () => {
      getPlantService.getPlant.mockRejectedValue(new Error('plante non trouvé'));

      const res = await request(app).get('/api/plant/999');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'plante non trouvé');
    });

    it('devrait retourner 500 en cas d\'erreur serveur', async () => {
      getPlantService.getPlant.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/plant/1');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur');
    });
  });

  describe('GET /api/plants', () => {
    it('devrait retourner toutes les plantes', async () => {
      const mockPlants = [{ plant_id: 1, plant_name: 'Rose' }, { plant_id: 2, plant_name: 'Tulipe' }];
      getPlantService.getAllPlants.mockResolvedValue(mockPlants);

      const res = await request(app).get('/api/plants');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockPlants);
      expect(getPlantService.getAllPlants).toHaveBeenCalled();
    });

    it('devrait retourner 500 en cas d\'erreur serveur lors de la récupération de toutes les plantes', async () => {
      getPlantService.getAllPlants.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/plants');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Erreur serveur');
    });
  });
});