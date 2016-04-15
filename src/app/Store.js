var EventEmitter = require('events').EventEmitter;

let Store = {
    eventEmitter:EventEmitter.prototype,

    addChangeListener: function(callback) {
        EventEmitter.prototype.on('change', callback);
    },

    removeChangeListener: function(callback){
        EventEmitter.prototype.removeListener('change', callback);
    },

};
module.exports = Store;