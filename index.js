require('dotenv').config();

const { Worker } = require('worker_threads')


//Starts three Workers Publisher, Subscriber, Updater
function startWorkers() {
  return new Promise((resolve, reject) => {

    //MQTT Subscriber that updates database with incoming coordinates
    const subscriber = new Worker('./server/subscriber.js');
    console.log("Starting subscriber...")
    subscriber.on('message', resolve);
    subscriber.on('error', reject);
    subscriber.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })

    //MQTT Publisher that publishes heatmap coordinate information
    const publisher = new Worker('./server/publisher.js');
    console.log("Starting publisher...")
    publisher.on('message', resolve);
    publisher.on('error', reject);
    publisher.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })

    //Updater that updates server/coordindates.json file with new coordinates
    const updater = new Worker('./server/updater.js');
    console.log("Starting updater...")
    updater.on('message', resolve);
    updater.on('error', reject);
    updater.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })

  })
}


async function start() {
  const result = await startWorkers()
  console.log(result);
}

start().catch(err => console.log(err))