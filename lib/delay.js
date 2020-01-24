function delay(time, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, time);
    });
 }

 module.exports = delay;