var db = require('../models');
var User = db.User;
var Messages = db.Messages;

let mesController = { 
  index: function (req, res) {
    console.log('this is mes place: '+ req.session.id);
    Messages.findAll()
      .then(function (messages) {
        res.render('index', {messages: messages, auth: req.session.id , user: req.session.user });
      });
      
  },
  indexApi: function (req, res) {
    Messages.findAll()
      .then(function (messages) {
        res.json(messages);
      });
  },
  messagelist: function(req,res){
    let mes = req.body.mes;
    req.checkBody('mes','內容不得為空白').notEmpty()
    var error = req.validationErrors()
    console.log(error)
    Messages.create({
      content: mes
    })
      .then(function(){
        res.redirect('/index');
    })
  },
  messageEdit: function(req,res){
    Messages.findAll()
      .then(function(messages){
        res.render('item',{'messages': messages})
    });
  },  
  messageUpdate: function(req,res){
    let messageItem = req.body.messageItem;
    let messageId = req.body.messageId;
    Messages.update({ 
      content: messageItem
    },{where:{id: messageId}})
      .then(()=>{
        res.redirect('/index');
      })
  },
  messageDelete: function(req,res){
    let messageId = req.body.messageId;
    Messages.destroy({ 
      where:{
        id: messageId
      }
    })
      .then(()=>{
        res.redirect('/index');
      })
  }
};
module.exports = mesController;