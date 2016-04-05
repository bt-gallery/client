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
  marginLeft: 0,
};

const styleBlock = {
  display:"inline-flex",
};
const styleImageWaiting = {
  position: 'absolute',
  width: 256,
  height: 256,
  paddingTop: 60,
  zIndex:-1,
};

let name="";
let surname="";
let age="";

let valid = false;

const RegisterParticipantForm = React.createClass({
  getInitialState : function() {
    return {
      nameErrorMessageText: "",
      surnameErrorMessageText: "",
      imageErrorMessageText:"",
      registerButtonDisabled:  true,
      addButtonDisabled: false,
      dialogOpen:false,
      loading:false,
    };
  },
  componentDidMount: function() {
    APIUtils.init=true;
    Ee.methods.on('workBinded', this.onWorkBinded);
  },

  toggleLoading: function() {
    this.setState({loading: !this.state.loading});
  },

  handleAddParticipant: function() {
    this.setState({addButtonDisabled:true});
    if (isNull(name)) {
      valid = false;
      this.setState({nameErrorMessageText:"Обязательно заполнить"});
      this.setState({addButtonDisabled:false});
      return;
    } else {
      valid = true;
      this.setState({nameErrorMessageText:""});
    }

    if (isNull(surname)) {
      valid = false;
      this.setState({surnameErrorMessageText:"Обязательно заполнить"});
      this.setState({addButtonDisabled:false});
      return;
    } else {
      valid = true;
      this.setState({surnameErrorMessageText:""});
    }

    if (!isInt(age.trim(), {min:4, max:18})) {
      valid = false;
      this.setState({ageErrorMessageText:"Возраст цифрами от 4 до 18, включительно"});
      this.setState({addButtonDisabled:false});
      return;
    } else {
      valid = true;
      this.setState({ageErrorMessageText:""});
    }

    if (sessionStorage.getItem('idCompetitiveWork') === '' || sessionStorage.getItem("idCompetitiveWork") === null) {
      this.setState({open:true, message:'Загрузите файл!'});
      valid = false;
    }

    if (valid) {
      self = this;
      Superagent.post('/api/v1/participant/')
        .field('idDeclarant', sessionStorage.getItem('idDeclarant'))
        .field('name',name)
        .field('surname',surname)
        .field('age',age)
        .end(function(err, res) {
          if (res && res.body && res.body.success) {
            Ee.methods.emit(
              'workBindingReady',
              res.body.success.idParticipant,
              sessionStorage.getItem('idDeclarant'),
              sessionStorage.getItem('idCompetitiveWork')
              );
            Ee.methods.emit('test', {name:name,surname:surname,webPath:sessionStorage.getItem('webPath')});
            name = "";
            surname = "";
            if (self.state.registerButtonDisabled) self.setState({registerButtonDisabled:false});
          } else {
            self.setState({open:true, message:'Ой! Ошибка.'});
          }
          console.log(res);
          console.log(err);
        });
    } else {
      console.log("Unknown error");
    }
    this.setState({addButtonDisabled:false});
  },

  handleSubmit: function() {
    this.setState({registerButtonDisabled:true});
    Superagent.post('/api/v1/competitive-bid/register/')
      .field('idDeclarant', sessionStorage.getItem('idDeclarant'))
      .end(function(err, res) {
        if (res && res.body && res.body.success) {
          Ee.methods.emit('betsMade');
          self.setState({dialogOpen: true});
        } else {
          self.setState({open:true, error:'Ой! Ошибка.'});
        }
        console.log(res);
        console.log(err);
      });
  },

  handleCloseDialog: function() {
    browserHistory.push("/address");
  },

  handleNameChange : function(event) {
    name = event.target.value;
  },

  handleSurnameChange : function(event) {
    surname = event.target.value;
  },

  handleAgeChange : function(event) {
    age = event.target.value;
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
    name = "";
    surname = "";
    sessionStorage.removeItem('idCompetitiveWork');
    this.forceUpdate();
  },

  render: function() {
    const modalActions = [
      <FlatButton
        label="Ок"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
    ];
    return (
      <div className="section group">
        <div className="info-block-2 col tough span_1_of_3 paragraph_margined">
          <p>
          Участником конкурса может стать ребенок или группа ребят в заявке одного заявителя.
          От каждого ребенка к конкурсу может быть допущена только одна работа.
          </p>
          <p>
          Заполните поля формы и загрузите рисунок.
          Нажмите кнопку "Добавить участника".
          Так Вы добавите одну работу к общей заявке.
          </p>
          <p>
          После того, как Вы добавите рисунки всех детей, обязательно нажмите кнопку "Зарегистрировать".
          </p>
          <p>
          Только после этого Ваша заявка будет принята на модерацию.
          </p>
          <div style={{margin:50}}>
            <a href={'https://www.youtube.com/watch?v=SYVUmVBgRBw&feature=youtu.be'} target={'_blank'} >
              Как заполнять заявку
            < /a>
          < /div>
        < /div>
        <div className="col span_2_of_3" style={styleBlock}>
          <div>
            <TextField
              floatingLabelText="Имя участника"
              errorText={this.state.nameErrorMessageText}
              onChange={this.handleNameChange}
              name={name}
              style={style}
            / >
            <br / >
            <TextField
              floatingLabelText="Фамилия"
              errorText={this.state.surnameErrorMessageText}
              onChange={this.handleSurnameChange}
              style={style}
            / >
            <br / >
            <TextField
              floatingLabelText="Возраст"
              errorText={this.state.ageErrorMessageText}
              onChange={this.handleAgeChange}
              style={style}
            / >
            <br / >
            <br / >
            <div style={styleImageWaiting}>
            {this.state.loading ?
              <CircularProgress size={2} /> : null
            }
            </ div>
            <ImageZone toggleLoading={this.toggleLoading} />
            <br / >
            <br / >
            <RaisedButton
              label="Добавить участника"
              onMouseDown={this.handleAddParticipant}
              style={style}
              disabled={this.state.addButtonDisabled}
            / >
            {this.state.open ?
              <Snackbar
                open={this.state.open}
                message={this.state.message}
                action="Ok"
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
              /> : null}
            <br / >
            <br / >
            {this.state.sending ?
              <div>
                <CircularProgress />
              </ div> :
              <FlatButton
                disabled={this.state.registerButtonDisabled}
                label="Зарегистрировать"
                secondary={true}
                onMouseDown={this.handleSubmit}
                style={style}
              / >}
            <Dialog
              title="Успешная регистрация!"
              actions={modalActions}
              modal={true}
              open={this.state.dialogOpen}
            >
              <div className="info-block-3">
                Спасибо за то, что вы принимаете участие в нашем конкурсе.
                Мы выслали Вам на почту уведомления о регистрации и порядковые номера участников на модерации.
              < /div>
            </Dialog>
          < /div>
        < /div>
        <div className="col tough span_2_of_3">
          <ParticipantsList / >
        < /div>
      < /div>
      );
  },
});

export default RegisterParticipantForm;
