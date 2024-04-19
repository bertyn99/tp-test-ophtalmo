import sessionRepository from '../repositories/sessionRepository.js';
import { getMaxGap, getAverage, getMedian } from '../utils/dateUtils.js';

const createSession = (startTime, endTime, pauses = []) => {
  return sessionRepository.createSession(startTime, endTime, pauses);
};

const getAllSessions = () => {
  return sessionRepository.getAllSessions();
};

const updateSession = (id, updates) => {
  return sessionRepository.updateSession(id, updates);
};

const getSessionStats = () => {
  const sessions = getAllSessions();
  const durations = sessions.map(session => session.getDuration());
  return {
    average: getAverage(durations),
    min: Math.min(...durations),
    max: Math.max(...durations),
    median: getMedian(durations),
    maxGap: getMaxGap(sessions)
  };
};

export default {
  createSession,
  getAllSessions,
  updateSession,
  getSessionStats
};