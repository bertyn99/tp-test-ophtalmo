import CobayeController from './cobaye.controller.js';
import CobayeService from './cobaye.service.js';
import CobayeRouter from './cobaye.router.js';
import CobayeRepository from './cobaye.repository.js';

const cobayeRepository = new CobayeRepository();
const cobayeService = new CobayeService(cobayeRepository);
const cobayeController = new CobayeController(cobayeService);
const cobayeRouter = new CobayeRouter(cobayeController);

export default {
  service: cobayeService,
  controller: cobayeController,
  router: cobayeRouter.getRouter(),
  repository: cobayeRepository
};