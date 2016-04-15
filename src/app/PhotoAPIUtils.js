import Superagent from 'superagent';
import Pagination from './Pagination';
let EventEmitter = require('events').EventEmitter;


module.exports = {

    eventEmitter: EventEmitter.prototype,

    addRecieveListener: function(callback) {
        EventEmitter.prototype.on('recieve', callback);
    },
    removeRecieveListener: function(callback){
        EventEmitter.prototype.removeListener('recieve', callback);
    },

    getPhotos: function(limit, offset) {
        let raw = {};
        Superagent.get('/api/v1/contributionSigned/getList/'+limit+'/'+offset)
               .end(function(err, res) {
                if (res && res.body) {
                    raw = res.body;
                    this.eventEmitter.emit('recieve', raw, limit, offset);
                } //TODO обработать err
            });
    },
    getDetailInfo: function(photo_id) {
        let info = {};
        Superagent.get('/api/v1/contribution/get/'+photo_id)
            .end(function(err, res) {
                if (res && res.body) {
                    info.photo = res.body;
                    Superagent.get('/api/v1/contribution/get/'+info.photo.idParticipant)
                        .end(function(err, res) {
                            if (res && res.body) {
                                info.participant = res.body;
                            } //TODO обработать err
                        });
                } //TODO обработать err
            });
        return info;
    },
};