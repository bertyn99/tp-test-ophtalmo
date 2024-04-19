import { describe, expect, it, vi } from 'vitest';
import CobayeService from "./cobaye.service.js";

describe('CobayeService', () => {

  const mockCobayes = [
    { nom: "Cobaye 1", sexe: "Male", dateDeNaissance: new Date("2020-01-01"), resultatsTestsOphtalmiques: "Initial results", _id: "661fa8f5185294c4fee1b41e" },
    { nom: "Cobaye 2", sexe: "Female", dateDeNaissance: new Date("2020-01-02"), resultatsTestsOphtalmiques: "Initial results", _id: "001fa8f5185294c4fee1b41e" },
    { nom: "Cobaye 3", sexe: "Male", dateDeNaissance: new Date("2020-01-03"), resultatsTestsOphtalmiques: "Initial results", _id: "111fa8f5185294c4fee1b41e" }
  ];

  const mockCobayeRepository = {
    getById: vi.fn((id) => mockCobayes[0]),
    getByName: vi.fn((name) => mockCobayes[0]),
    getAll: vi.fn(() => mockCobayes),
    deleteById: vi.fn((id) => undefined),
    deleteAll: vi.fn(() => undefined),
    create: vi.fn((cobaye) =>({ ...cobaye, _id: "661fa8f5185294c4fee1b41e" })),
    update: vi.fn((cobaye) => cobaye),
  };

  const cobayeService = new CobayeService(mockCobayeRepository);

  describe('addCobaye', () => {
    it('nominal case - should add a new cobaye to the cobayes array', async () => {
      // GIVEN
      const cobaye =  { nom:'Cobaye 4',prenom:'4', sexe:'Male',dateDeNaissance: new Date("2020-01-04"),resultatsTestsOphtalmiques:'Initial results'};
      const customMockCobayeRepository = {
        getByName: vi.fn(() => undefined),
        create: vi.fn((cobaye) => ({ ...cobaye, _id: "661fa8f5185294c4fee1b41e" }))
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
        getAll: vi.fn(() => [])
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