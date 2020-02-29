const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER_HOST || 'mqtt://test.mosquitto.org');
const topic = process.env.COORDINATES_PUBLSIH_TOPIC || 'testing/meetup/user';
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;


var usernames = ['test_username_1', 'test_username_2', 'test_username-3']

async function init() {
    while (true) {
        client.publish(topic,);
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