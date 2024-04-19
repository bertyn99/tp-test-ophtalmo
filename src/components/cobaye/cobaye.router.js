import express from 'express';

class CobayeRouter {
  constructor(cobayeController) {
    this.cobayeController = cobayeController;
  }

  getRouter() {
    const router = express.Router();

    /**
     * @swagger
     * /cobayes/{id}:
     *   get:
     *     summary: Get a cobaye by ID
     *     tags: [Cobaye]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: objectId
     *         required: true
     *         description: The cobaye's ID
     *     responses:
     *       200:
     *         description: Returns a cobaye
     *       404:
     *         description: Cobaye not found
     *       500:
     *         description: Server error
     */
    router.route('/:id').get(this.cobayeController.getCobayeById);

    /**
     * @swagger
     * /cobayes/{id}:
     *   delete:
     *     summary: Delete a cobaye by ID
     *     tags: [Cobaye]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: objectId
     *         required: true
     *         description: The cobaye's ID
     *     responses:
     *       204:
     *         description: Deleted
     *       404:
     *         description: Cobaye not found
     *       500:
     *         description: Server error
     */
    router.route('/:id').delete(this.cobayeController.deleteCobayeById);

    /**
     * @swagger
     * /cobayes:
     *   get:
     *     summary: Get all cobayes
     *     tags: [Cobaye]
     *     responses:
     *       200:
     *         description: Returns a list of cobayes
     *       500:
     *         description: Server error
     */
    router.route('/').get(this.cobayeController.getCobayes);

    /**
     * @swagger
     * /cobayes:
     *   post:
     *     summary: Create a new cobaye
     *     tags: [Cobaye]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Cobaye'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cobaye'
     *       500:
     *         description: Server error
     */
    router.route('/').post(this.cobayeController.createCobaye);

    /**
     * @swagger
     * /cobayes:
     *   put:
     *     summary: Update a cobaye
     *     tags: [Cobaye]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Cobaye'
     *     responses:
     *       200:
     *         description: Updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cobaye'
     *       404:
     *         description: Cobaye not found
     *       500:
     *         description: Server error
     */
    router.route('/').put(this.cobayeController.updateCobaye);

    /**
     * @swagger
     * /cobayes:
     *   delete:
     *     summary: Delete all cobayes
     *     tags: [Cobaye]
     *     responses:
     *       204:
     *         description: Deleted
     *       500:
     *         description: Server error
     */
    router.route('/').delete(this.cobayeController.deleteCobayes);

    return router;
  }
}

export default CobayeRouter;