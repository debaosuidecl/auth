const {User} = require('../models/user')


let auth = (req, res, next)=> {
    let token = req.cookies.auth;
    User.findByToken(token,(err, user)=>{
        if (err) return console.log(err);
        if(!user) return res.status(401/*for unauthorized*/).json({message: "You have no authorization"})
            req.token = token;
            next();
    })

}


module.exports = {auth}