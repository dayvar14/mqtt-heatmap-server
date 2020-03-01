require('dotenv').config();

// index.js
// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads')

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const subscriber = new Worker('./server/subscriber.js', { workerData });
    console.log("Starting subscriber...")
    subscriber.on('message', resolve);
    subscriber.on('error', reject);
    subscriber.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
    const publisher = new Worker('./server/publisher.js', { workerData });
    console.log("Starting publisher...")
    publisher.on('message', resolve);
    publisher.on('error', reject);
    publisher.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
    const updater = new Worker('./server/updater.js', { workerData });
    console.log("Starting updater...")
    updater.on('message', resolve);
    updater.on('error', reject);
    updater.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

async function run() {
  const result = await runService('world')
  console.log(result);
}

run().catch(err => console.log(err))