const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017/test'

/*
MongoClient.connect(url, (err,db)=> {
    if(err){
        console.log("could not connect");
    } else{
        console.log('connected');
        db.close();
    }
});*/

/*
MongoClient.connect(url, (err,db)=> {
    const cars = [
        {model:"camry", year:"2017"},
        {model:"Mercedes", year: "2100"}
    ]

    db.collection('Cars').insertMany(cars, (err, docs)=> {
        if (err){
            console.log(err)
        }
        console.log(docs)
    });

    db.close();
})*/
/*
MongoClient.connect(url, async (err, db)=> {
    try{
        const myDB =  await db.collection('Cars').find({year: "2017", model: "Chevy"},{model: 0, year: 0}).toArray()// specify 0 in model and year to not recieve them
        console.log(myDB)
        db.close();
    } catch(err){
        console.log(err)

        db.close();
    }


})*/
/*

MongoClient.connect(url, async (err, db)=> {
    try{
        const myDB =  await db.collection('Cars').findOneAndDelete({model: "Chevrolet"})
        console.log(myDB)
        db.close();

    } catch(err){
        console.log(err)

        db.close();
    }


})*/


MongoClient.connect(url, async (err, db)=> {
    try{
        const myDB =  await db.collection('Cars').findOneAndUpdate(
            {name: "Francis"},
            {
                $set:{
                    lastname: "Breaker"
                },
                $inc:{
                    age:+2
                }
            },
            {
                upsert: true,
                returnOriginal: false
            }
        );
        console.log(myDB)
        db.close();

    } catch(err){
        console.log(err)

        db.close();
    }


})
