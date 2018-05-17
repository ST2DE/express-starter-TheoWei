var db = require('../models');
var Task = db.Task;
var User = db.User;


let taskController = {
  index: function (req, res) {
    Task.findAll()
      .then(function (tasks) {
        res.render('index', {"tasks": tasks});
      });
  },
  indexApi: function (req, res) {
    Task.findAll()
      .then(function (tasks) {
        res.json(tasks);
      });
  },
  tasklist: function(req,res){
    let taskName = req.body.taskName;
    Task.create({
      title: taskName
    })
      .then(function(){
        res.redirect('/tasks');
    })
  },
  userLogin: function(req,res){
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    User.findOrCreate({
      where:{
        username: userName,
        password: userPassword
      }
    })
    .spread((user,created)=>{
      console.log(user.get({plain:true}))
      console.log('user created: '+ created)
      /*
      if(created != true){
        alert()
        alert('Hello '+ user.username);
      }else{
        alert('Welcom to join ' + user.username);
      }
      */
    })
    .then(function(){
      res.redirect('/tasks');
    })
  },
  taskEdit: function(req,res){
    Task.findAll()
      .then(function(tasks){
        res.render('item',{'tasks': tasks})
    });
  },  
  taskUpdate: function(req,res){
    let taskItem = req.body.taskItem;
    let taskId = req.body.taskId;
    Task.update({ 
      title: taskItem
    },{where:{id: taskId}})
      .then(()=>{
        res.redirect('/tasks');
      })
  },
  taskDelete: function(req,res){
    let taskId = req.body.taskId;
    Task.destroy({ 
      where:{
        id: taskId
      }
    })
      .then(()=>{
        res.redirect('/tasks');
      })
  }  
  
};
module.exports = taskController;