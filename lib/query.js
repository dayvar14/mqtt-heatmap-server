//use
//let query = require(query)
module.exports = {
    insert: async function(model, data) {
        const document = new model(data);
        const result = await document.save();
        return result;
    },

    update: async function(model, key, data) {
        options = { new: true };
        const result = await model.findOneAndUpdate(key, { $set: data }, options);
        return result;
    },

    upsert: async function(model, key, data) {
        options = { upsert: true, runValidators: true };
        const result = await model.findOneAndUpdate(key, { $set: data }, options);
        return result;
    },

    remove: async function(model, key) {
        const result = await model.deleteOne(key);
        return result;
    },

    find: async function(model, key) {
        const result = await model.find(key);
        return result;
    },

    findOne: async function(model, key) {
        const result = await model.findOne(key)
        return result
    }
};