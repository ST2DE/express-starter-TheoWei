var express = require('express');
var app = express();
var db = require('../models');
var User = db.User;
var flash = require('connect-flash');
app.use(flash());
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('login',new LocalStrategy({ //(passport optional Name,Strategy)
    usernameField:'userName',
    passwordField:'userPassword',
    passReqToCallback: true 
},function(req,usernameValue,password,done){
    User.findOne({ where:{username:usernameValue}})//search User Table username column math value username that we input (table column,input value)    
        .then((user)=>{
            console.log(user);
            if(!user){
                return done( null, false, { message: req.flash('LoginUserError','無此使用者!') } );
                
            }
            
            if ( user.password !== password ) {
                return done( null, false, { message: req.flash('LoginPasswordError','密錯錯誤!') } );
                
            }
            
            return done(null, user ); //done是callback傳回驗證結果，不過要記得前面加return 
            
        })        
}));

passport.use('signup',new LocalStrategy({ //(OptionName,Strategy)
    usernameField:'userName',
    passwordField:'userPassword',
    passReqToCallback: true 
  },(req,usernameValue,password,done)=>{
    var findOrCreateUser = ()=>{
        User.findOne({
            where: {
                username:usernameValue
            }})
            .then((user)=>{
                
                if(user){
                    return done(null,false,req.flash('SignUpUserError','User exist!'))
                }else{
                    
                    
                    var newUser = {};
                    newUser.username = usernameValue;
                    newUser.password = password;
                    console.log(newUser);
                    User.create(newUser).then((user)=>{
                        console.log('this is create session: '+user)
                        if(!user){
                            console.log('have pass this session passport to err ');
                            throw err;
                        }
                        return done (null,user)
                    });
                }  
            })  
    }
    process.nextTick(findOrCreateUser) 
  }
));

app.use(passport.initialize());
app.use(passport.session());


module.exports = passport;