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
        let raw;

        raw = [
            {
                "id": "1",
                "contributionTime": "2016-04-14 18:33:49",
                "contributionName": "Утро в сосновом бору",
                "contributionDescription": "Ну краски там холст, типа круто",
                "storePath": 'null',
                "webPath": 'http://konkurs.mir24.tv/files/works/4611/1459353964_0.JPG.resized.JPG',
                "fileName": 'null',
                "contributionModeration": 'null',
                "contributionRejection": 'null',
                "category": 'null',
                "priority": 'null',
                "type": 'null',
                "fileSize": 'null',
                "idParticipant": "1",
                "participantTime": "2016-04-15 12:38:26",
                "idDeclarant": "1",
                "participantName": "12123132",
                "surname": "123132123132",
                "patronymic": "132132132132130231",
                "participantDescription": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
                "year": '1900',
                "participantModeration": 'null',
                "participantRejection": 'null',
                "team": 'null',
            },
            {
                "id": "2",
                "contributionTime": "2016-04-15 12:43:44",
                "contributionName": "Явление Христа народу",
                "contributionDescription": "Большое полотно, много времени и сил",
                "storePath": 'null',
                "webPath": 'http://konkurs.mir24.tv/files/works/4611/1459353964_0.JPG.resized.JPG',
                "fileName": 'null',
                "contributionModeration": 'null',
                "contributionRejection": 'null',
                "category": 'null',
                "priority": 'null',
                "type": 'null',
                "fileSize": 'null',
                "idParticipant": "2",
                "participantTime": "2016-04-15 12:45:00",
                "idDeclarant": "2",
                "participantName": "Вася",
                "surname": "Просто Вася",
                "patronymic": "Кланяться не обязательно",
                "participantDescription": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
                "year": '1234',
                "participantModeration": 'null',
                "participantRejection": 'null',
                "team": 'null',
            },
            {
                "id": "3",
                "contributionTime": "2016-04-15 12:44:27",
                "contributionName": "Портрет неизвестной",
                "contributionDescription": "А она ниче так..",
                "storePath": 'null',
                "webPath": 'http://konkurs.mir24.tv/files/works/4611/1459353964_0.JPG.resized.JPG',
                "fileName": 'null',
                "contributionModeration": 'null',
                "contributionRejection": 'null',
                "category": 'null',
                "priority": 'null',
                "type": 'null',
                "fileSize": 'null',
                "idParticipant": "3",
                "participantTime": "2016-04-15 12:45:25",
                "idDeclarant": "3",
                "participantName": "Алексей",
                "surname": "Рожков",
                "patronymic": "Евдокимович",
                "participantDescription": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
                "year": '3455',
                "participantModeration": 'null',
                "participantRejection": 'null',
                "team": 'null',
            },
            {
                "id": "4",
                "contributionTime": "2016-04-15 12:44:27",
                "contributionName": "Портрет неизвестной",
                "contributionDescription": "А она ниче так..",
                "storePath": 'null',
                "webPath": 'http://konkurs.mir24.tv/files/works/4611/1459353964_0.JPG.resized.JPG',
                "fileName": 'null',
                "contributionModeration": 'null',
                "contributionRejection": 'null',
                "category": 'null',
                "priority": 'null',
                "type": 'null',
                "fileSize": 'null',
                "idParticipant": "4",
                "participantTime": "2016-04-15 12:45:25",
                "idDeclarant": "3",
                "participantName": "Алексей",
                "surname": "Рожков",
                "patronymic": "Евдокимович",
                "participantDescription": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
                "year": '5435',
                "participantModeration": 'null',
                "participantRejection": 'null',
                "team": 'null',
            },
        ];
        this.eventEmitter.emit('recieve', raw, limit, offset);

        /*Superagent.get('/api/v1/contributionSigned/getList/'+limit+'/'+offset)
               .end(function(err, res) {
                if (res && res.body) {
                    raw = res.body;
                    this.eventEmitter.emit('recieve', raw, limit, offset);
                } //TODO обработать err
            });*/
    },
    getDetailInfo: function(photo_id) {
        let info = {};
        info.photo = {
            "id": "1",
            "time": "2016-04-14 18:33:49",
            "idParticipant": "1",
            "name": "Утро в сосновом бору",
            "description": "Ну краски там холст, типа круто",
            "storePath": null,
            "webPath": 'http://konkurs.mir24.tv/files/works/1658/1459010995_0.jpg',
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
            "name": "Кирилллл",
            "surname": "Пороавыщаотм",
            "patronymic": "Олегович",
            "description": 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
            "year": '1990',
            "moderation": null,
            "rejection": null,
            "team": null,
        };
        /*
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
            });*/
        return info;
    },
};