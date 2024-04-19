import Session from '../models/Session.js';

const createSession = (startTime, endTime, pauses = []) => {
  const session = new Session(startTime, endTime, pauses);
  // Enregistrer la session dans la base de données
  return session;
};

const getAllSessions = () => {
  // Récupérer toutes les sessions enregistrées dans la base de données
  return Session.getAllSessions();
};

const updateSession = (id, updates) => {
  // Mettre à jour une session existante dans la base de données
  return Session.updateSession(id, updates);
};

export default {
  createSession,
  getAllSessions,
  updateSession
};