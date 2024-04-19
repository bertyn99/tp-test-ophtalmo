import { expect, it, describe, vi } from 'vitest';
import SessionService from "./session.service.js";
import { mockSessions } from '../../prisma/seed.js';

describe('SessionService', () => {
  const mockSessionRepository = {
    getById: vi.fn((id) => mockSessions[0]),
    getAll: vi.fn(() => mockSessions),
    deleteById: vi.fn((id) => undefined),
    deleteAll: vi.fn(() => undefined),
    create: vi.fn((session) => ({
      cobaye_id: "661fa8f5185294c4fee1b41e",
      date_heure_de_debut: new Date(),
      duree_totale_de_port: 110,
      pauses: 30,
      id: "661fa8f5225294c4fee1b41e"
    })),
    update: vi.fn((session) => session),
  };

  const sessionService = new SessionService(mockSessionRepository);

  describe('createSession', () => {
    it('should create a new session', async () => {
      const session = await sessionService.createSession({
        cobaye_id: "661fa8f5185294c4fee1b41e",
        startTime: new Date(),
        pauses: 30,
      });
      expect(session).toEqual({
        cobaye_id: "661fa8f5185294c4fee1b41e",
        startTime: new Date(),
        pauses: 30,
      });
      expect(mockSessionRepository.create).toHaveBeenCalledWith({
        cobaye_id: "661fa8f5185294c4fee1b41e",
        date_heure_de_debut: new Date(),
        duree_totale_de_port: 110,
        pauses: 30,
      });
    });
  });


  describe('update', () => {
    it('should update a session', async () => {
      const updatedSession = {
        id: "661fa8f5225294c4fee1b41e",
        cobaye_id: "661fa8f5185294c4fee1b41e",
        date_heure_de_debut: new Date(),
        duree_totale_de_port: 120,
        pauses: 40,
      };
      const session = await sessionService.updateSession(updatedSession);
      expect(session).toEqual(updatedSession);
      expect(mockSessionRepository.update).toHaveBeenCalledWith(updatedSession);
    });
  });
});