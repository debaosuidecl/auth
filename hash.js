/*const bycrypt = require('bcryptjs');
const {MD5} = require('crypto-js')*/
const jwt= require('jsonwebtoken')

/*
bycrypt.genSalt(10, (err, salt)=> {
    if(err) return next(err);
    bycrypt.hash('password123', salt, (err, hash)=> {
        if(err) return next(err);
        console.log(hash);
    })

})*/
/*

const secret = "mydirtylittlesecret";
const secretSalt = "jkldjkflasdfjhjkshdfjsdhfks";

const user = {
    id: 1,
    token: MD5('clemento').toString()+secretSalt
}

const receivedToken = "76ba6da75b2afcddef1187047729b9d7jkldjkflasdfjhjkshdfjsdhfks"

if (receivedToken===user.token){
    console.log("move forward");
}

console.log(user);*/

const id = "10000";
const secret = "mydirtylittlesecret";
const receivedToken = "eyJhbGciOiJIUzI1NiJ9.MTAwMDA.40Px1ewYFJ1j_fwMwt8nzn7uwhHEkOKY77ABFUbi8K4"

const token = jwt.sign(id,secret);  // used to encode
const decodeToken = jwt.verify(receivedToken,secret); // used to decode

console.log(decodeToken)
