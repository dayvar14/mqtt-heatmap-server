require('dotenv').config();

const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER_HOST || 'localhost',{port:1883});
const topic = process.env.COORDINATES_SUBSCRIBE_TOPIC;
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;


var usernames = ['test_username_1', 'test_username_2', 'test_username-3']
console.log(process.env.MQTT_BROKER_HOST)
async function init() {
    while (true) {
      for(var i = 0; i < usernames.length;i++){
        client.publish(topic,'{"id": "dayvar", "lat":"41.98288","lng":"-87.72090"}');
      }
        
        await sleep(delay);
        console.log("Published coordinates on " + topic + "...")
    }
}
console.log(Number.parseFloat("41.982887").toFixed(process.env.COORDINATES_LAT_PRECISION))
console.log(Number.parseFloat("-87.720914").toFixed(process.env.COORDINATES_LAT_PRECISION))
console.log(process.env.MIN_COORDINATES_LAT);
console.log(process.env.MAX_COORDINATES_LAT);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

init();