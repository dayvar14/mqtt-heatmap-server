require('dotenv').config();

const fs = require('fs');
const mqtt = require('mqtt');
const mqttClient = mqtt.connect(process.env.MQTT_BROKER_HOST || 'localhost',{port:1883});
const topic = process.env.COORDINATES_SUBSCRIBE_TOPIC;
const delay = process.env.COORDINATES_PUBLISH_DELAY || 2000;

var base = "test_username"
console.log(process.env.MQTT_BROKER_HOST)
async function init() {
  let users = []

  for(var i = 0; i < 100;i++){
    let lat = (Math.random() * (41.982887 - 41.975692) + 41.975692).toFixed(6);
    let lng = (Math.random() * (-87.716022 - -87.720914) + -87.7209142).toFixed(6);
    let id = base + i;
    users.push( {lat:lat, lng:lng, id:id});
  }
  
    while (true) {
      for(var i = 0; i < 100;i++){
        if( Math.random()
        //{id:<id>, lat:<latitude>, lng:<longitude>}
        let object = {lat:lat, lng:lng, id:id}
        mqttClient.publish(topic,JSON.stringify(object));
      }
      console.log("Published coordinates on " + topic + "...")
        await sleep(3000);
        
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

init();