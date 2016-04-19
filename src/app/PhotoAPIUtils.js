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

        Superagent.get('/api/v1/contributionSigned/getList/'+limit+'/'+offset)
               .end(function(err, res) {
                if (res && res.body && !res.body.error) {
                    raw = res.body.data;
                    let total=res.body.meta.total;
                    PhotoAPIUtils.eventEmitter.emit('recieve', raw, limit, offset, total);
                } else if (res.body.error){
                    console.log(res.body.error['message']+' | '+res.body.error['legend']);
                } //TODO обработать err
            });
    },
    getDetailInfo: function(photo_id) {
        let info = {};
        /*
        info.photo = {
            "id": "1",
            "time": "2016-04-14 18:33:49",
            "idParticipant": "1",
            "name": "Утро в сосновом бору",
            "description": "Ну краски там холст, типа круто",
            "storePath": null,
            "webPath": 'http://foto1945.mir24.tv/files/p1d37.jpg',
            "fileName": null,
            "moderation": null,
            "rejection": null,
            "category": null,
            "priority": null,
            "type": null,
            "fileSize": null,
        };
        info.participant= {
            "id": "1",
            "time": "2016-04-15 12:38:26",
            "idDeclarant": "1",
            "name": "Дмитрий",
            "surname": "Пальмов",
            "patronymic": "Олегович",
            "description": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
            "year": '1990',
            "moderation": null,
            "rejection": null,
            "team": null,
        };*/

        Superagent.get('/api/v1/contribution/get/'+photo_id)
            .end(function(err, res) {
                if (res && res.body) {
                    info.photo = res.body;
                    Superagent.get('/api/v1/participant/get/'+info.photo.idParticipant)
                        .end(function(error, result) {
                            if (result && result.body) {
                                info.participant = result.body;
                                console.log(info);
                                PhotoAPIUtils.eventEmitter.emit('recieveInfo', info);
                            } //TODO обработать err
                        });
                } //TODO обработать err
            });
        console.log(info);
        return false;
    },
};

module.exports = PhotoAPIUtils;