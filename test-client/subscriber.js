const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTT_BROKER_HOST || 'mqtt://test.mosquitto.org')

client.on('connect', function () {
    client.subscribe('testing/meetup', function (err) {

    })
  })

  client.on('message', function (topic, payload) {
    // message is Buffer
    console.log(payload.toString())
  });
