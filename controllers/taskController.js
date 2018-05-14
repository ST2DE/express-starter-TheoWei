var db = require('../models');
var Task = db.Task;

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
  }
};
module.exports = taskController;