import userModule from '../components/user/user.module.js';
import cobayeModule from '../components/cobaye/cobaye.module.js';
/* import todoModule from '../components/todo/todo.module.js'; */

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/cobaye', cobayeModule.router);
  /* app.use('/todos', todoModule.router); */
};
