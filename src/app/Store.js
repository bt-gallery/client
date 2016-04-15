import Pagination from './Pagination';
let EventEmitter = require('events').EventEmitter;
import PhotoAPIUtils from './PhotoAPIUtils';


const Store = {

    images:{},

    offset:'',

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
        let prev_offset = (offset-limit)>0 ? offset-limit : 0;
        let next_offset = offset+limit;
        Store.images = raw;
        Store.eventEmitter.emit('change',prev_offset, next_offset);
        //PhotoAPIUtils.removeRecieveListener(this.getNew);
    },

};

PhotoAPIUtils.addRecieveListener(Store.getNew);

module.exports = Store;