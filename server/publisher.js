const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER_HOST|| 'mqtt://test.mosquitto.org');
const topic = process.env.COORDINATES_TOPIC || 'testing/meetup';
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;

data = fs.readFileSync('server/coordinates.json', 'utf8');

async function init() {

    while (true) {
      data = fs.readFileSync('server/coordinates.json', 'utf8');
      console.log(data)
        client.publish(topic,data);
        await sleep(delay);
        console.log("Published coordinates on " + topic + "...")
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

init();