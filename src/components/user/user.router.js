import express from 'express';

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: objectId
     *         required: true
     *         description: The user's ID
     *     responses:
     *       200:
     *         description: Returns a user
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     */
    router.route('/:id').get(this.userController.getUserById);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: objectId
     *         required: true
     *         description: The user's ID
     *     responses:
     *       204:
     *         description: No content
     *       404:
     *         description: User not found
     */
    router.route('/:id').delete(this.userController.deleteUserById);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Returns a list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    router.route('/').get(this.userController.getUsers);

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */
    router.route('/').post(this.userController.createUser);

    /**
     * @swagger
     * /users:
     *   put:
     *     summary: Update a user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     */
    router.route('/').put(this.userController.updateUser);

    /**
     * @swagger
     * /users:
     *   delete:
     *     summary: Delete all users
     *     tags: [User]
     *     responses:
     *       204:
     *         description: No content
     */
    router.route('/').delete(this.userController.deleteUsers);

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Login a user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Logged in
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       401:
     *         description: Unauthorized
     */
    router.route('/login').post(this.userController.login);

    return router;
  }
}

export default UserRouter;