require('dotenv').config();

const fs = require('fs');
const mqtt = require('mqtt');

const delay = require('../lib/delay');

const publishDelay = process.env.COORDINATES_PUBLISH_DELAY || 5000;
const topic = process.env.COORDINATES_PUBLISH_TOPIC || "";

const mqttHost = process.env.MQTT_BROKER_HOST
const mqttPort = process.env.MQTT_BROKER_PORT
const mqttOptions = {port: mqttPort}

const client = mqtt.connect( mqttHost|| 'localhost',mqttOptions);

data = fs.readFileSync('server/coordinates.json', 'utf8');

async function start() {

  //Publishes the coordinates on server/coordinates onto mqtt publish topic
    while (true) {
      data = fs.readFileSync('server/coordinates.json', 'utf8');
      client.publish(topic,data);
      console.log("Coordinates published on "+topic+"...")
      
      await delay(publishDelay);
    }
}

start();