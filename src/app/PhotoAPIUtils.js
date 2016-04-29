import Superagent from 'superagent';
import Pagination from './Pagination';
let EventEmitter = require('events').EventEmitter;

let PhotoAPIUtils = {

    eventEmitter: EventEmitter.prototype,

    addRecieveListener: function(callback) {
        EventEmitter.prototype.on('recieve', callback);
    },
    removeRecieveListener: function(callback){
        EventEmitter.prototype.removeListener('recieveInfo', callback);
    },
    addRecieveInfoListener: function(callback) {
        EventEmitter.prototype.on('recieveInfo', callback);
    },
    removeRecieveInfoListener: function(callback){
        EventEmitter.prototype.removeListener('recieveInfo', callback);
    },

    getPhotos: function(limit, offset) {
        let raw;

        Superagent.get('/api/v1/contribution/getList/'+limit+'/'+offset)
               .end(function(err, res) {
                if (res && res.body && !res.body.error) {
                    raw = res.body.data;
                    let total=res.body.meta;
                    PhotoAPIUtils.eventEmitter.emit('recieve', raw, limit, offset, total);
                } else if (res.body.error){
                    console.log(res.body.error['message']+' | '+res.body.error['legend']);
                } //TODO обработать err
            });
    },
    getDetailInfo: function(photo_id) {
        let info = {};

        Superagent.get('/api/v1/contribution/get/'+photo_id)
            .end(function(err, res) {
                if (res && res.body) {
                    info = res.body;
                    PhotoAPIUtils.eventEmitter.emit('recieveInfo', info);
                } //TODO обработать err
            });
        return false;
    },
};

module.exports = PhotoAPIUtils;