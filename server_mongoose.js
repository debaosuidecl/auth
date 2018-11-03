const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test'
mongoose.connect(url);
mongoose.Promise = global.Promise;  // Mongoose by default doesn't have promise support so we want to specify that we want
                                    // to use the global Promise for promise and stuff


const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    avail: Boolean
});
const Car = mongoose.model('Car', carSchema);
/*
const addCar = new Car({
    brand: 'Volvo',
    model: 'Potus',
    year: 1998,
    avail: false
});


addCar.save((err, docs)=> {
    if (err) {

        console.log(err);
    }
    console.log(docs)
})*/


/*
const newCar = async()=> {
    try{
        const myCar = await addCar.save()
        console.log(myCar)
    }
    catch(err){
    console.log('Did not save car')
    }
}

newCar();
*/

// to find documents in mongoose, : findById, find, findOne
/*
Car.findById("5bdd4c4d10476831183e669d",(err,docs)=> {
    if(err){console.log(err)}
    console.log(docs)
})*/


//to delete documents in mongoose, : findOneAndRemove, findByIdAndRemove, remove
/*

Car.remove({}, (err,docs)=> {
    if(err){console.log(err)}
    console.log(docs)
})*/

// to update in mongoose: update, findByIdAndUpdate(that takes a string as arg as do all the find by ids),

/*
Car.update(
    {_id: '5bdd5352afd4430f7a2e5f83'},
    {
        $set:{
        brand: "Nissan"
        }
    },// there is no option to return original like mongoDriver when you use only update, that is available with findByIdAndUpdate
    (err, docs)=> {
        if(err) return console.log(err);
        console.log(docs);
    }

    );*/

/*
Car.findByIdAndUpdate('5bdd5352afd4430f7a2e5f83',
    {
       $set: {
           brand: "Ferrari"
       }
    },
    {new: false},
    (err, doc)=> {
        if(err) return console.log(err);
        console.log(doc)
    }
    )
*/


Car.findById("5bdd5352afd4430f7a2e5f83", (err,car)=>{
    if(err) return console.log(err);
    car.set({
        brand: "Porche", model: "Impala"
    });
    car.save((err,doc)=> {
        if(err) return console.log(err);
        console.log(doc)
    })
})