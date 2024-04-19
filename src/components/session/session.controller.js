class SessionController {
  createSession(req, res) {
    const { startTime, endTime, pauses } = req.body;
    const session = app.createSession(startTime, endTime, pauses);
    res.status(201).json(session);
  }

  getSessions(req, res) {
    const sessions = app.getAllSessions();
    res.json(sessions);
  }

  updateSession(req, res) {
    const { id } = req.params;
    const updates = req.body;
    const updatedSession = app.updateSession(id, updates);
    res.json(updatedSession);
  }

  getSessionStats(req, res) {
    const stats = app.getSessionStats();
    res.json(stats);
  }
}

export default new SessionController();