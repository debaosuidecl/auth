const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
mongoose.Promise = global.Promise;
const {User} = require('./models/user');
const {auth} = require('./middleware/auth')
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/auth");
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/api/user', async (req, res)=> {

    try{
        const {email, password} = req.body;
        const newUser = new User ({
            email,
            password
        });
        newUser.generateToken((err,user)=> {
            if(err) throw err;
            res.status(200).send(user);
        })
/*
        const newUser = await user.save()
              res.status(200).send(newUser);
*/




    } catch(e){
        res.status(404).send(e);
    }

});

app.post('/api/user/login', (req, res)=> {


   User.findOne({email: req.body.email},(err, user)=> {
       if (err) throw err;
        if(!user){ // if mongoose can't find user return error message
            res.status(404).json({message: 'Authentication failed. User not found'})
        } else{
           user.comparePassword(req.body.password,(err, isMatch)=>{
               if(err) throw err;
               if(!isMatch){
                   return res.status(400).json({message:'Wrong Password'})
               } else{
                    user.generateToken((err, user)=>{
                        if (err){
                            return res.status(400).send(err);
                        } else{
                            res.cookie('auth',user.token).send('ok')
                        }
                    })
               }

            })
        }

       });
    });

app.get('/user/profile',auth,(req,res)=>{
    res.status(200).json({message: `you have access right now with ${req.token}`})
});


const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`started on port ${port}`)
})