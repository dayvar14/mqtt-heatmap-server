require('dotenv').config();

const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER_HOST || 'mqtt://test.mosquitto.org',{port:1883});
const topic = process.env.COORDINATES_PUBLSIH_TOPIC || 'testing/meetup/user';
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;


var usernames = ['test_username_1', 'test_username_2', 'test_username-3']
console.log(process.env.MQTT_BROKER_HOST)
async function init() {
    while (true) {
      for(var i = 0; i < usernames.length;i++){
        client.publish(topic,'{username: dayvar, lat:"23",lng:"23"}');
      }
        
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