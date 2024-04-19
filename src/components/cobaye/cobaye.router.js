import express from 'express';

class CobayeRouter {
  constructor(cobayeController) {
    this.cobayeController = cobayeController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.cobayeController.getCobayeById);
    router.route('/:id').delete(this.cobayeController.deleteCobayeById);
    router.route('/').get(this.cobayeController.getCobayes);
    router.route('/').post(this.cobayeController.createCobaye);
    router.route('/').put(this.cobayeController.updateCobaye);
    router.route('/').delete(this.cobayeController.deleteCobayes);
    return router;
  }
}

export default CobayeRouter;