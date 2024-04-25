import { expect, it, describe, vi } from 'vitest';
import SessionService from "./session.service.js";
import { mockSessions } from '../../prisma/seed.js';

describe('SessionService', () => {
  const mockSessionRepository = {
    getById: vi.fn((id) => mockSessions[0]),
    getAllSessions: vi.fn(() => mockSessions),
    deleteById: vi.fn((id) => undefined),
    deleteAll: vi.fn(() => undefined),
    createSession: vi.fn((cobaye_id, startTime, pauses) => ({ cobaye_id, startTime, pauses, id: "661fa8f5225294c4fee1b41e" })),
    updateSession: vi.fn((id, session) => session),
    getSessionStats: vi.fn(() => ({
      average: 60,
      min: 30,
      max: 90,
      median: 60,
      maxGap: 30
    }))

  };

  const sessionService = new SessionService(mockSessionRepository);

  describe('createSession', () => {
    it('should create a new session', async () => {

      const mockSession = {
        cobaye_id: "661fa8f5185294c4fee1b41e",
        startTime: new Date(),
        pauses: 10
      }
      const session = await sessionService.createSession(mockSession);
      console.log('session', session);
      expect(session).toEqual({
        ...mockSession,
        id: "661fa8f5225294c4fee1b41e"
      });
      expect(mockSessionRepository.createSession).toHaveBeenCalledWith(mockSession.cobaye_id, mockSession.startTime, mockSession.pauses);
    });
  });

  describe('updateSession', () => {
    it('should update a session', async () => {
      const updatedSession = {
        cobaye_id: "661fa8f5185294c4fee1b41e",
        date_heure_de_debut: new Date(),
        duree_totale_de_port: 120,
        pauses: 40,
      };

      const session = await sessionService.updateSession("661fa8f5225294c4fee1b41e", updatedSession);
      expect(session).toEqual(updatedSession);
      expect(mockSessionRepository.updateSession).toHaveBeenCalledWith("661fa8f5225294c4fee1b41e", updatedSession);
    });
  });

  describe('getAllSessions', () => {
    it('should return all sessions', async () => {
      const sessions = await sessionService.getAllSessions();
      expect(sessions).toEqual(mockSessions);
      expect(mockSessionRepository.getAllSessions).toHaveBeenCalled();
    });
  });

  describe('getSessionStats', () => {
    it('should return the session stats', async () => {
      const sessionStats = await sessionService.getSessionStats();
      expect(sessionStats).toEqual({
        average: 60,
        min: 30,
        max: 90,
        median: 60,
        maxGap: 30
      });
    });
  });


});