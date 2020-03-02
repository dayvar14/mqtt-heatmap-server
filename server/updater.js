require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');

const Coordinates = require('../schemas/coordinates');
const delay = require('../lib/delay');

const env = process.env.NODE_ENV;

const updateDelay = Number(process.env.COORDINATES_UPDATE_DELAY) || 10000;

var mongoDBOptions = { useNewUrlParser: true , useCreateIndex: true,  useUnifiedTopology: true};
const mongoDBUri = process.env.DB_HOST;

async function updateHeatMap() {

    let startTime = process.hrtime();

    mongoose.connect(mongoDBUri, mongoDBOptions)
        .then(() => console.log('Updater connected to MongoDB...'))
        .catch(err => console.error('Updater could not connect to MongoDB...', err));

    try {

        //Recieves the amount of distinct coordaintes along with their count from MongoDB database
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { lat: "$lat", lng: "$lng" }, "count": { "$sum": 1 } } }
        ]);

        
        //Stores result in a array
        let coordinateArray = [];
        for (key in result) {
            coordinateArray.push({lat: result[key]._id.lat,lng: result[key]._id.lng, count: result[key].count});
        }

        //Writes coordinate information from MongoDB database to server/coordinates.json
       const jsonContent = JSON.stringify(coordinateArray,null, ' ');
       JSONToFile(jsonContent, "server/coordinates.json")

    }
    catch (ex) {
        console.log(ex.message);
    }

    let endTime = process.hrtime(startTime)
    mongoose.disconnect();

    console.log("Updater updated server/coordinates.json in "+ endTime[1]/ 1000000 +"ms");
}
//Writes an JSON Array to a specified file
function JSONToFile(jsonContent, path)
{
    fs.writeFile(path, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    }); 
}

async function start()
{
    try
    {
        while(true)
        {
            await updateHeatMap();
            await delay(updateDelay);
        }
    }
    catch(ex)
    {
        console.log(ex.message);
    }
}

start();
