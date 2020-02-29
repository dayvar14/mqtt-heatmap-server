require('dotenv').config();

const fs = require('fs');
const mqtt = require('mqtt');

const topic = process.env.COORDINATES_PUBLISH_TOPIC || 'testing/meetup';
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;
const mqttHost = process.env.MQTT_BROKER_HOST
const mqttPort = process.env.MQTT_BROKER_PORT
const options = {port: mqttPort}

const client = mqtt.connect(process.env.MQTT_BROKER_HOST|| 'mqtt://test.mosquitto.org',{port:1883});
console.log(process.env.MQTT_BROKER_HOST)




data = fs.readFileSync('server/coordinates.json', 'utf8');

async function init() {

    while (true) {
      data = fs.readFileSync('server/coordinates.json', 'utf8');
        client.publish(topic,data);
        console.log("Coordinates published on "+topic+"...")
        await sleep(delay);
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

init();