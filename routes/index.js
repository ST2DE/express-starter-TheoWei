const taskController = require('../controllers/taskController.js');

module.exports = function (app) {

  app.get('/tasks', taskController.index);
  app.get('/api/tasks', taskController.indexApi);
  app.post('/tasks/taskList',taskController.tasklist);
  app.post('/tasks/Login',taskController.userLogin);
  
  app.get('/tasks/edit',taskController.taskEdit);
  app.post('/tasks/update',taskController.taskUpdate);
  app.post('/tasks/delete',taskController.taskDelete);
  
};