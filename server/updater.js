require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');
const Coordinates = require('../schemas/coordinates');
const delay = require('../lib/delay');

//Updates Heatmap with coordinates from the Coordinates Table then writes the coordinates
//to a csv file
const updateDelay = Number(process.env.COORDINATES_UPDATE_DELAY) || 10000
const uri = process.env.DB_HOST
async function updateHeatMap() {

    let startTime = process.hrtime()

    //Connects to HeatMap Database
    mongoose.connect(uri, { useNewUrlParser: true , useCreateIndex: true,  useUnifiedTopology: true })
        .then(() => console.log('Updater connected to MongoDB...'))
        .catch(err => console.error('Updater could not connect to MongoDB...', err));

    array = [];
    try {

        //From the Coordinates Table, result recieves the coordinates and 
        //stores the amount of duplicate coordinates in sum
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { lat: "$lat", lng: "$lng" }, "count": { "$sum": 1 } } }
        ]);

        

        coordinateArray = [];
        for (key in result) {
            coordinateArray.push({lat: result[key]._id.lat,lng: result[key]._id.lng, count: result[key].count});
        }

        //Writes coordinates to file
       const jsonContent = JSON.stringify(coordinateArray,null, ' ');

       JSONToFile(jsonContent, "server/coordinates.json")

    }
    catch (ex) {
        console.log(ex.message);
    }

    let endTime = process.hrtime(startTime)
    console.log("Updated Heatmap in "+ endTime[1]/ 1000000 +"ms");
    mongoose.disconnect();
}
//Writes an array to a specified file
function JSONToFile(jsonContent, path)
{
    fs.writeFile(path, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    }); 
}

async function run()
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

run();
