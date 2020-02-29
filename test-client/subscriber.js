require('dotenv').config();

const mqtt = require('mqtt')
const host = process.env.MQTT_BROKER_HOST 
const portNo = 1883

const client = mqtt.connect(host,{port:1883})
console.log(process.env.MQTT_BROKER_HOST )
client.on('connect', function () {
    client.subscribe('testing/meetup/coordinates', function (err) {

    })
  })

  client.on('message', function (topic, payload) {
    // message is Buffer
    console.log(payload.toString())
  });
