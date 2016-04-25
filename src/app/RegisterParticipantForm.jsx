import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ParticipantsList from './ParticipantsList';
import isNull from 'validator/lib/isNull';
import isInt from 'validator/lib/isInt';
import ImageZone from './ImageZone';
import Superagent from 'superagent';
import Snackbar from 'material-ui/lib/snackbar';
import Ee from 'event-emitter';
import APIUtils from './APIUtils';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import CircularProgress from 'material-ui/lib/circular-progress';
import {browserHistory} from 'react-router';

const style = {
  float: 'left',
};

const oneFoto = 'Вы можете отправить ее на регистрацию, нажав кнопку "Зарегистрировать", или добавить еще несколько фотографий.'
const severalFotos = 'Вы можете отправить загруженные фото на регистрацию, нажав кнопку "Зарегистрировать", или добавить еще несколько.'

const styleBlock = {
  display:"inline-flex",
  'paddingLeft':'30px',
};
const styleImageWaiting = {
  display:'block',
  position: 'absolute',
  left:87,
  width: 256,
  height: 256,
  paddingTop: 60,
  zIndex:10,
};

const about = {
    '.about>label':{
        'left':0,
    },
};
const add = {
    width: 173,
}

let self;

let valid = true;

const RegisterParticipantForm = React.createClass({
  getInitialState : function() {
    return {
      imageErrorMessageText:"",
      registerButtonDisabled:  true,
      addButtonDisabled: true,
      dialogOpen:false,
      wellDone:false,
      loading:false,
      fotos:0,
      waiting:false,
    };
  },
  componentDidMount: function() {
    APIUtils.init=true;
    Ee.methods.on('workBinded', this.onWorkBinded);
    Ee.methods.on('fileUploaded',this.enableButton);
    Ee.methods.on('uploadStarted',this.showLoadWrap);

  },

  toggleLoading: function(){
    this.setState({loading: !this.state.loading});
  },
  enableButton: function (){
    this.setState({addButtonDisabled: false, waiting:false});

  },
  showLoadWrap: function (){
    this.setState({waiting:true});
  },

  handleAddParticipant: function() {
    this.setState({addButtonDisabled:true});
    if (sessionStorage.getItem('idCompetitiveWork') === '' || sessionStorage.getItem("idCompetitiveWork") === null) {
      this.setState({open:true, message:'Загрузите файл!'});
      valid = false;
    }

    if (valid) {
      self = this;
        Superagent.put('/api/v1/contribution/update')
            .type('form')
            .send({"idDeclarant": sessionStorage.getItem('idDeclarant'),
              "description": self.state.description,
              "persons": self.state.persons,
              "idContribution": sessionStorage.getItem('idCompetitiveWork'),
            })
        .end(function(err, res) {
          if (res && res.body && res.body.success) {
            Ee.methods.emit(
              'workBindingReady',
              sessionStorage.getItem('idDeclarant'),
              sessionStorage.getItem('idCompetitiveWork')
              );
            Ee.methods.emit('test', {name:self.state.persons,webPath:sessionStorage.getItem('webPath')});
            self.setState({
              description:'',
              persons:'',
            });
            if (self.state.registerButtonDisabled) self.setState({registerButtonDisabled:false});
          } else {
            self.setState({open:true, message:'Ой! Ошибка.'});
          }
        });
    } else {
      console.log("Unknown error");
    }
    this.setState({addButtonDisabled:true});
  },

  handleSubmit: function() {
    this.setState({registerButtonDisabled:true});
    Superagent.put('/api/v1/register/')
      .type('form')
      .send({idDeclarant: sessionStorage.getItem('idDeclarant')})
      .end(function(err, res) {
        if (res && res.body && res.body.success) {
          Ee.methods.emit('betsMade');
          self.setState({dialogOpen: true});
        } else {
          self.setState({open:true, error:'Ой! Ошибка.'});
        }
      });
  },

  handleCloseDialog: function() {
    browserHistory.push("/gallery");
  },

  handleDescriptionChange : function(event) {
    this.setState({
      description:event.target.value,
    });
  },
  handlePersonsChange : function(event) {
    this.setState({
      persons:event.target.value,
    });
  },
  handleCloseNotific :function() {
    this.setState({
      wellDone:false,
    })
  },

  onDrop: function(files) {
    this.setState({
      files: files,
    });
  },

  onOpenClick: function() {
    this.refs.dropzone.open();
  },

  handleRequestClose : function() {
    this.setState({
      open: false,
    });
  },

  onWorkBinded: function() {
    let fotos = this.state.fotos+1;
    this.setState({
      description:'',
      persons:'',
      wellDone:true,
      fotos:fotos,

    });
    sessionStorage.removeItem('idCompetitiveWork');
  },

  render: function() {
    const modalActions = [
      <FlatButton
        label="Ок"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
    ];
    const wellDoneActions = [
      <FlatButton
        label="Ок"
        primary={true}
        onTouchTap={this.handleCloseNotific}
      />,
    ];
    return (
      <div className="section group">
        <div className="info-block-2 col tough span_1_of_3 paragraph_margined">
          <p>
            Жизнь в мирное время прекрасна, несмотря ни на какие трудности. Особенно хорошо это знают те, кому довелось пройти через войну. Каждый год они ждали и ждут 9 мая как самого важного для них праздника.
          </p>
          <p>
            У каждого из нас есть родные и близкие, которые внесли свою лепту в победу над агрессором, развязавшим самую страшную войну в истории. В преддверии празднования Дня Победы МТРК «Мир» запускает проект «Мир без войны».
          </p>
          <p>
            Давайте вместе соберем галерею фотопортретов фронтовиков и ветеранов тыла после их возвращения к обычной жизни. Присылайте снимки своих отцов и матерей, бабушек и дедушек, которые пережили войну и подарили мирную жизнь своим детям и внукам. Пусть их портреты станут напоминанием о том, как дорога каждому Победа, доставшаяся столь дорогой ценой.
          </p>
          <p>
            В описании к фото Вы можете рассказать о жизненном пути этих людей и о событии, запечатленном на снимке. Если на фотографии несколько ветеранов, Вы также можете рассказать о них в описании.
            </p>
          <div style={{margin:50}}>
            <a href={'https://www.youtube.com/watch?v=SYVUmVBgRBw&feature=youtu.be'} target={'_blank'} >
              Как заполнять заявку
            < /a>
          < /div>
        < /div>
        <div className="span_1_of_3" style={styleBlock}>
          <div>
            <TextField
                floatingLabelText="ФИО ветерана(ов)"
                multiLine={true}
                onChange={this.handlePersonsChange}
                value={this.state.persons}
                className="about"
                style={about}
            / >
            <br / >
              <TextField
              floatingLabelText="Люди и события на фото"
              className="about"
              rows={2}
              onChange={this.handleDescriptionChange}
              multiLine={true}
              value={this.state.description}
              style={about}
            / >
            <br / >
            <br / >
              <div className="upload">
            <div style={this.state.waiting ? styleImageWaiting : {display:'none'}}>
            {this.state.loading ?
              <CircularProgress size={2} /> : null
            }
            </ div>
            <ImageZone toggleLoading={this.toggleLoading} />
            <br / >
            <br / >
            <RaisedButton
              label="Добавить фото"
              onMouseDown={this.handleAddParticipant}
              style={add}
              disabled={this.state.addButtonDisabled}
            / >
            <br / >
            <br / >
            {this.state.sending ?
              <div>
                <CircularProgress />
              </ div> :
              <RaisedButton
                disabled={this.state.registerButtonDisabled}
                style={this.state.registerButtonDisabled ? {visibility:'hidden'} : {visibility:'visible'}}
                label="Зарегистрировать"
                labelColor="#FFF"
                backgroundColor="#4FCE7C"
                onMouseDown={this.handleSubmit}
              / >}
                  </div>
              {this.state.open ?
                  <Snackbar
                      open={this.state.open}
                      message={this.state.message}
                      action="Ok"
                      autoHideDuration={5000}
                      onRequestClose={this.handleRequestClose}
                  /> : null}
            <Dialog
              title="Успешная регистрация!"
              actions={modalActions}
              modal={true}
              open={this.state.dialogOpen}
            >
              <div className="info-block-3">
                Ваши фотографии приняты!
                Благодарим Вас за участие в нашей акции! В ближайшее время фотографии пройдут модерацию и будут опубликованы в нашей галерее. После публикации Вы получите уведомление и ссылку на фотографию.
                < /div>
            </Dialog>
            <Dialog
              title="Фотография добавлена!"
              actions={wellDoneActions}
              modal={true}
              open={this.state.wellDone}
            >
              <div className="info-block-3">
                {this.state.fotos> 1 ? severalFotos : oneFoto}
                < /div>
            </Dialog>
          < /div>
        < /div>
        <div>
          <ParticipantsList / >
        < /div>
      < /div>
      );
  },
});

export default RegisterParticipantForm;
