import { getMaxGap, getAverage, getMedian } from '../../utils/dateUtils.js';

class SessionService {
  constructor(repository) {
    this.sessionRepository = repository;
  }

  createSession(startTime, pauses = []) {
    return this.sessionRepository.createSession(startTime, pauses);
  }

  getAllSessions() {
    return this.sessionRepository.getAllSessions();
  }

  updateSession(id, updates) {
    return this.sessionRepository.updateSession(id, updates);
  }

  getSessionStats() {
    const sessions = this.getAllSessions();
    const durations = sessions.map(session => session.getDuration());
    return {
      average: getAverage(durations),
      min: Math.min(...durations),
      max: Math.max(...durations),
      median: getMedian(durations),
      maxGap: getMaxGap(sessions)
    };
  }
}

export default SessionService;