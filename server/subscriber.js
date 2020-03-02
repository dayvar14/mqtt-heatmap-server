require('dotenv').config();

const mqtt = require('mqtt');
const mongoose = require('mongoose');

const Coordinates = require('../schemas/coordinates');
const query = require('../lib/query');

const mqttHost = process.env.MQTT_BROKER_HOST;
const mqttPort = process.env.MQTT_BROKER_PORT;
const mqttOptions = {port:mqttPort};
const mqttClient = mqtt.connect( mqttHost || 'localhost', mqttOptions)
const subscribeTopic = process.env.COORDINATES_SUBSCRIBE_TOPIC || '';

var mongoDBOptions = { useNewUrlParser: true , useCreateIndex: true,  useUnifiedTopology: true};
const mongoDBUri = process.env.DB_HOST;

async function start() {
    mongoose.connect(mongoDBUri, mongoDBOptions)
    .then(() => console.log('Subscriber connected to MongoDB...'))
    .catch(err => console.error('Subscriber could not connect to MongoDB...', err));

    //Listens for coordinates being published on the subscribe topic
      mqttClient.on('connect', function () {
        mqttClient.subscribe(subscribeTopic, function (err) {
          console.log("Subscriber failed to subscribe...")
        })
      })
    
      //Once messge is recieved client sends information to the MongoDB database
      mqttClient.on('message', function (subscribeTopic, payload) {
        try{

          const coordinate = JSON.parse(payload.toString());
                    query.upsert(Coordinates, {id: coordinate.id}, {lat: coordinate.lat, lng:coordinate.lng, lastUpdate: new Date}).catch(err => console.error('Invalid Data..'))

        }
        catch(err){
          console.log("Failed to add " + payload.toString());
        }
     });

}

start()