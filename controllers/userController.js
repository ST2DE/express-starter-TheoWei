var db = require('../models');
//var passport =require('../models/passport');
var User = db.User;


let userController = { 
  indexLogin: function(req,res){
    res.render('login',{UserError: req.flash('LoginUserError'),PasswordError: req.flash('LoginPasswordError')});
    
  },
  userLogin: function(req,res){
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    req.session.id = req.user.id;
    req.session.user = req.user.username;
    console.log("this is session: "+req.session.id+' ,this is username: '+req.session.user);
    res.redirect('/index');
  },
  indexSignup: function(req,res){
    
    res.render('signup',{errorUser: req.flash('SignUpUserError'),errorPassword: req.flash('SignUpPasswordError')});
  },
  userSignup: function(req,res){
    
    console.log('have pass this session usercontroller');
    res.redirect('/index');
  },
  userLogout: function(req,res){
    req.logout();
    req.session.destroy();
    res.redirect('/index');
  }
};
module.exports = userController;