import express from 'express';

class SessionRouter {
  constructor(sessionController) {
    this.sessionController = sessionController;
  }

  getRouter() {
    const router = express.Router();

    /**
     * @swagger
     * /sessions:
     *   post:
     *     summary: Create a new session
     *     description: Add a new session to the user's account
     *     tags: [Session]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               startTime:
     *                 type: string
     *                 format: date-time
     *               endTime:
     *                 type: string
     *                 format: date-time
     *               pauses:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     start:
     *                       type: string
     *                       format: date-time
     *                     end:
     *                       type: string
     *                       format: date-time
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       500:
     *         description: Internal server error
     */
    router.post('/', this.sessionController.createSession);

    /**
     * @swagger
     * /sessions:
     *   get:
     *     summary: Get all sessions
     *     description: Retrieve all sessions for a user
     *     tags: [Session]
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Session'
     *       500:
     *         description: Internal server error
     */
    router.get('/', this.sessionController.getSessions);

    /**
     * @swagger
     * /sessions/{id}:
     *   patch:
     *     summary: Update a session
     *     description: Update a specific session for a user
     *     tags: [Session]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: objectId
     *         required: true
     *         description: The session ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               startTime:
     *                 type: string
     *                 format: date-time
     *               endTime:
     *                 type: string
     *                 format: date-time
     *               pauses:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     start:
     *                       type: string
     *                       format: date-time
     *                     end:
     *                       type: string
     *                       format: date-time
     *     responses:
     *       200:
     *         description: Updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       404:
     *         description: Not found
     *       500:
     *         description: Internal server error
     */
    router.patch('/:id', this.sessionController.updateSession);

    /**
     * @swagger
     * /sessions/stats:
     *   get:
     *     summary: Get session statistics
     *     description: Retrieve session statistics for a user
     *     tags: [Session]
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SessionStats'
     *       500:
     *         description: Internal server error
     */
    router.get('/stats', this.sessionController.getSessionStats);

    return router;
  }
}

export default SessionRouter;