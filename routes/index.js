const mesController = require('../controllers/mesController.js');
const userController = require('../controllers/userController.js');
const passport = require('../controllers/passport.js');
module.exports = function (app) {

  app.get('/index', mesController.index);
  app.get('/api/tasks', mesController.indexApi);
  app.post('/index/messages',mesController.messagelist);

  app.get('/index/login',userController.indexLogin);
  app.post('/index/login/user',passport.authenticate('login',{failureRedirect: '/index/login',session:false}),userController.userLogin);
// ,failureFlash: 'Fail!!Fail!!Fail!!Fail!!'
  app.get('/index/signup',userController.indexSignup);
  app.post('/index/signup/user',passport.authenticate('signup',{failureRedirect: '/index/signup',session:false}),userController.userSignup);
  
  app.post('/index/logout',userController.userLogout);


  app.get('/index/edit',mesController.messageEdit);
  app.post('/index/update',mesController.messageUpdate);
  app.post('/index/delete',mesController.messageDelete);
  
};