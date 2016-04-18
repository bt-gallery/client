import Ee from 'event-emitter';
import Superagent from 'superagent';

const bindCompetitiveWork = function(idParticipant, idDeclarant, idCompetitiveWork) {
  Superagent.put('/api/v1/contribution/update')
    .field('idParticipant',idParticipant)
    .field('idDeclarant',idDeclarant)
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
