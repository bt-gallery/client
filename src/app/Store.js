import Pagination from './Pagination';
let EventEmitter = require('events').EventEmitter;
import PhotoAPIUtils from './PhotoAPIUtils';


let Store = {

    images:{},

    eventEmitter:EventEmitter.prototype,

    addChangeListener: function(callback) {
        EventEmitter.prototype.on('change', callback);
    },

    removeChangeListener: function(callback){
        EventEmitter.prototype.removeListener('change', callback);
    },

    getAll: function(){
        return this.images;
    },

    getNew: function (raw, limit, offset) {
        this.images = raw;
        let oldOffset = offset;
        offset += offset;
        this.eventEmitter.emit('change',oldOffset, offset);
        PhotoAPIUtils.removeRecieveListener(this.getNew);
    },

};

PhotoAPIUtils.addRecieveListener(Store.getNew);

module.exports = Store;