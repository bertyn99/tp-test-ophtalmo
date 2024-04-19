
const createSessionHandler = (req, res) => {
  const { startTime, endTime, pauses } = req.body;
  const session = app.createSession(startTime, endTime, pauses);
  res.status(201).json(session);
};

const getSessionsHandler = (req, res) => {
  const sessions = app.getAllSessions();
  res.json(sessions);
};

const updateSessionHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedSession = app.updateSession(id, updates);
  res.json(updatedSession);
};

const getSessionStatsHandler = (req, res) => {
  const stats = app.getSessionStats();
  res.json(stats);
};

export default {
  createSessionHandler,
  getSessionsHandler,
  updateSessionHandler,
  getSessionStatsHandler
};