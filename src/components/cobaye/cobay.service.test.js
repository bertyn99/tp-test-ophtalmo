import Cobaye from './cobaye.entities';
import { describe, expect, it, jest } from '@jest/globals';
import CobayeService from "./cobaye.service.js";

describe('CobayeService', () => {

  const mockCobayes = [
    new Cobaye("Cobaye 1", "Male", new Date("2020-01-01"), "Initial results", "661fa8f5185294c4fee1b41e"),
    new Cobaye("Cobaye 2", "Female", new Date("2020-01-02"), "Initial results", "001fa8f5185294c4fee1b41e"),
    new Cobaye("Cobaye 3", "Male", new Date("2020-01-03"), "Initial results", "111fa8f5185294c4fee1b41e")
  ];

  const mockCobayeRepository = {
    getById: jest.fn((id) => mockCobayes[0]),
    getByName: jest.fn((name) => mockCobayes[0]),
    getAll: jest.fn(() => mockCobayes),
    deleteById: jest.fn((id) => undefined),
    deleteAll: jest.fn(() => undefined),
    create: jest.fn((cobaye) => new Cobaye(cobaye.nom, cobaye.prenom, cobaye.dateDeNaissance, cobaye.sexe, cobaye.resultatsTestsOphtalmiques, "661fa8f5185294c4fee1b41e")),
    update: jest.fn((cobaye) => cobaye),
  };

  const cobayeService = new CobayeService(mockCobayeRepository);

  describe('addCobaye', () => {
    it('nominal case - should add a new cobaye to the cobayes array', async () => {
      // GIVEN
      const cobaye = new Cobaye('Cobaye 4', 'Male', new Date("2020-01-04"), 'Initial results');
      const customMockCobayeRepository = {
        getByName: jest.fn(() => undefined),
        create: jest.fn((cobaye) => new Cobaye(cobaye.nom, cobaye.prenom, cobaye.dateDeNaissance, cobaye.sexe, cobaye.resultatsTestsOphtalmiques, "661fa8f5185294c4fee1b41e"))
      }
      const customCobayeService = new CobayeService(customMockCobayeRepository);

      // WHEN
      const res = await customCobayeService.addCobaye(cobaye);

      // THEN
      expect(res.nom).toBe(cobaye.nom);
      expect(res.prenom).toBe(cobaye.prenom);
      expect(res.dateDeNaissance).toBe(cobaye.dateDeNaissance);
      expect(res.sexe).toBe(cobaye.sexe);
      expect(res.resultatsTestsOphtalmiques).toBe(cobaye.resultatsTestsOphtalmiques);
      expect(res._id).toBeDefined();
    });

    it('functional error - should throw an error if a cobaye with the same name already exists', async () => {
      // GIVEN
      const existingCobaye = { ...mockCobayes[0] };

      // WHEN + THEN
      await expect(cobayeService.addCobaye(existingCobaye)).rejects.toThrow('Cobaye already exists');
    });
  });

  describe('getCobayes', () => {
    it('nominal case - should return an empty array if there are no cobayes in the database', () => {
      // GIVEN
      const customMockCobayeRepository = {
        getAll: jest.fn(() => [])
      }
      const customCobayeService = new CobayeService(customMockCobayeRepository);

      // WHEN
      const res = customCobayeService.getCobayes();

      // THEN
      expect(res).toEqual([]);
    });

    it('nominal case - should return an array of all cobayes in the database', () => {
      expect(cobayeService.getCobayes().length).toEqual(3);
    });
  });
});