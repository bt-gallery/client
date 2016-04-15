import Superagent from 'superagent';

module.exports = {
    getPhotos: function() {
        Superagent.get('/api/v1/contributionSigned/getList/10/0')
               .end(function(err, res) {
                if (res && res.body) {
                    return res.body;
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
