require('dotenv').config();

const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTT_BROKER_HOST || 'mqtt://test.mosquitto.org',{port:1883})
const topic = process.env.COORDINATES_SUBSCRIBE_TOPIC || 'testing/meetup/user';
const mongoose = require('mongoose');
const Coordinates = require('../schemas/coordinates');
const query = require('../lib/query');


//Connects to Heatmap Database
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true , useCreateIndex: true,  useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


async function init() {

    client.on('connect', function () {
        client.subscribe(topic, function (err) {
        })
      })
    
      client.on('message', function (topic, payload) {
        // message is Buffer
        const coordinate = JSON.parse(payload.toString());
        query.upsert(Coordinates, {username: coordinate.username}, {lat: coordinate.lat, lng:coordinate.lng, lastUpdate: new Date})
     });

}

init()