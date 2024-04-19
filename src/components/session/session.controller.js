class SessionController {

  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  async createSession(req, res) {
    const { startTime, endTime, pauses } = req.body;
    try {
      const session = await this.sessionService.createSession(startTime, endTime, pauses);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSessions(req, res) {
    try {
      const sessions = await this.sessionService.getAllSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateSession(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedSession = await this.sessionService.updateSession(id, updates);
      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSessionStats(req, res) {
    try {
      const stats = await this.sessionService.getSessionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default SessionController;