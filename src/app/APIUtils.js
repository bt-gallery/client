import Ee from 'event-emitter';
import Superagent from 'superagent';

const bindCompetitiveWork = function(idParticipant, idCompetitiveWork) {
  Superagent.post('/api/v1/competitive/bind')
    .field('idParticipant',idParticipant)
    .field('idCompetitiveWork',idCompetitiveWork)
    .end(function(err, res) {
      if (res && res.body && res.body.success) {
        Ee.methods.emit('workBinded');
        sessionStorage.removeItem('idCompetitiveWork');
      } else {
        Ee.methods.emit('unknownError');
      }
      console.log(res);
      console.log(err);
    });
  console.log("binding");
  console.log(idCompetitiveWork);
  console.log(idParticipant);
};

Ee.methods.on('workBindingReady', bindCompetitiveWork);
