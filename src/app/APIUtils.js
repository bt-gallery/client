import Ee from 'event-emitter';
import Superagent from 'superagent';

const bindCompetitiveWork = function(idDeclarant, idCompetitiveWork) {
  Superagent.put('/api/v1/bind')
    .type('form')
      .send({"idDeclarant": idDeclarant, "idContribution": idCompetitiveWork})
    .end(function(err, res) {
      if (res && res.body && res.body[0]['success']) {
        Ee.methods.emit('workBinded');
        sessionStorage.removeItem('idCompetitiveWork');
      } else {
        Ee.methods.emit('unknownError');
      }
    });
  console.log("binding");
  console.log(idCompetitiveWork);
  console.log(idDeclarant);
};

Ee.methods.on('workBindingReady', bindCompetitiveWork);
