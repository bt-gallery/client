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
import CircularProgress from 'material-ui/lib/circular-progress';
import FlatButton from 'material-ui/lib/flat-button';
import {browserHistory} from 'react-router';

const style = {
  marginLeft: 0,
};

const styleBlock = {
  display:"inline-flex",
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
      registerButtonDisabled:  true,
    };
  },
  componentDidMount: function() {
    APIUtils.init=true;
    Ee.methods.on('workBinded', this.onWorkBinded);
  },
  handleAddParticipant: function() {
    if (isNull(name)) {
      valid = false;
      this.setState({nameErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({nameErrorMessageText:""});
    }

    if (isNull(surname)) {
      valid = false;
      this.setState({surnameErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({surnameErrorMessageText:""});
    }

    if (!isInt(age)) {
      valid = false;
      this.setState({ageErrorMessageText:"Возраст цифрами от 4 до 18 лет, включительно"});
      return;
    } else {
      valid = true;
      this.setState({ageErrorMessageText:""});
    }

    if (valid) {
      self = this;
      Superagent.post('/api/v1/participant/')
        .field('idDeclarant', sessionStorage.getItem('idDeclarant'))
        .field('name',name)
        .field('surname',surname)
        .end(function(err, res) {
          if (res && res.body && res.body.success) {
            Ee.methods.emit(
              'workBindingReady',
              res.body.success.idParticipant,
              sessionStorage.getItem('idCompetitiveWork')
              );
            Ee.methods.emit('test', {name:name,surname:surname,webPath:sessionStorage.getItem('webPath')});
            this.setState({registerButtonDisabled:false});
          } else {
            self.setState({open:true, error:'Ой! Ошибка.'});
          }
          console.log(res);
          console.log(err);
        });
    } else {
      console.log("Unknown error");
    }
  },

  handleSubmit: function() {
    browserHistory.push("/declarant");
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
    return (
      <div style={styleBlock}>
        <div>
          <TextField
            floatingLabelText="Имя участника"
            errorText={this.state.nameErrorMessageText}
            onChange={this.handleNameChange}
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
          <ImageZone />
          <br / >
          <br / >
          <RaisedButton label="Добавить участника" onMouseDown={this.handleAddParticipant} style={style} / >
          {this.state.open ?
            <Snackbar
              open={this.state.open}
              message={this.state.error}
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
        < /div>
        <ParticipantsList / >
      < /div>
      );
  },
});

export default RegisterParticipantForm;
