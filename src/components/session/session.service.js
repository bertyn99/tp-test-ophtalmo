import { getMaxGap, getAverage, getMedian } from '../../utils/dateUtils.js';
import DateTime from 'luxon';
class SessionService {
  constructor(repository) {
    this.sessionRepository = repository;
  }

  createSession(newSession) {
    const { cobaye_id, startTime, pauses } = newSession;
    console.log('newSession', newSession);
    return this.sessionRepository.createSession(cobaye_id, startTime, pauses);
  }

  getAllSessions() {
    return this.sessionRepository.getAllSessions();
  }

  updateSession(id, updates) {
    return this.sessionRepository.updateSession(id, updates);
  }

  getSessionStats() {
    const sessions = this.getAllSessions();
    const durations = sessions.map(session => this.getDuration(session));
    return {
      average: getAverage(durations),
      min: Math.min(...durations),
      max: Math.max(...durations),
      median: getMedian(durations),
      maxGap: getMaxGap(sessions)
    };
  }
  getDuration = (session) => {
    return session.duree_totale_de_port - session.pauses;
  }

  getSessionEndDate = (session) => {
    return new Date(session.date_heure_de_debut.getTime() + session.duree_totale_de_port * 60000);
  }


  getSessionById(id) {
    return this.sessionRepository.getById(id);
  }
}

export default SessionService;