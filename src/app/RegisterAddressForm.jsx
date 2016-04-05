import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import isNull from 'validator/lib/isNull';
import Superagent from 'superagent';
import CircularProgress from 'material-ui/lib/circular-progress';
import Snackbar from 'material-ui/lib/snackbar';

let country="";
let subject="";
let area="";
let city="";
let street="";
let building="";
let appartment="";
let zipCode="";
let phone="";

let valid = false;

const RegisterAddressForm = React.createClass({
  getInitialState : function() {
    return {
      countryErrorMessageText : "",
      cityErrorMessageText: "",
      streetErrorMessageText: "",
      buildingErrorMessageText: "",
      appartmentErrorMessageText: "",
      zipCodeErrorMessageText: "",
      phoneErrorMessageText: "",
      submitDisable: false,
    };
  },

  handleSubmit : function() {
    if (isNull(country)) {
      valid = false;
      this.setState({countryErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({countryErrorMessageText:""});
    }

    if (isNull(city)) {
      valid = false;
      this.setState({cityErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({cityErrorMessageText:""});
    }

    if (isNull(street)) {
      valid = false;
      this.setState({streetErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({streetErrorMessageText:""});
    }

    if (isNull(building)) {
      valid = false;
      this.setState({buildingErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({buildingErrorMessageText:""});
    }

    if (isNull(appartment)) {
      valid = false;
      this.setState({appartmentErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({appartmentErrorMessageText:""});
    }

    if (isNull(zipCode)) {
      valid = false;
      this.setState({zipCodeErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({zipCodeErrorMessageText:""});
    }

    if (isNull(phone)) {
      valid = false;
      this.setState({phoneErrorMessageText:"Обязательно заполнить"});
      return;
    } else {
      valid = true;
      this.setState({phoneErrorMessageText:""});
    }

    //Just to have ESLint shut use someway
    if (!isNull(subject)||!isNull(area)) {
      console.log("Bazinga!");
    }

    if (valid) {
      const self = this;
      this.setState({sending:true, submitDisable:true});
      Superagent.post('/api/v1/address/')
        .field('idDeclarant', sessionStorage.getItem('idDeclarant'))
        .field('country',country)
        .field('subject',subject)
        .field('area',area)
        .field('city',city)
        .field('street',street)
        .field('building',building)
        .field('appartment',appartment)
        .field('zipCode',zipCode)
        .field('phone',phone)
        .set('Accept','application/json')
        .end(function(err, res) {
          if (res && res.body && res.body.success) {
            console.log(res.body.success);
            self.setState({open:true, message:'Мы сохранили Ваш aдрес!', sending:false});
          } else {
            console.log(err);
            self.setState({open:true, message:'Ой! Ошибка.'});
          }
        });
    } else {
      console.log("Unknown error");
    }
  },

  handleSubjectChange : function(event) {
    subject = event.target.value;
  },

  handleCountryChange : function(event) {
    country = event.target.value;
  },

  handleAreaChange : function(event) {
    area = event.target.value;
  },

  handleCityChange : function(event) {
    city = event.target.value;
  },

  handleStreetChange : function(event) {
    street = event.target.value;
  },

  handleBuildingChange : function(event) {
    building = event.target.value;
  },

  handleAppartmentChange : function(event) {
    appartment = event.target.value;
  },

  handleZipCodeChange : function(event) {
    zipCode = event.target.value;
  },

  handlePhoneChange: function(event) {
    phone = event.target.value;
  },

  handleRequestClose : function() {
    this.setState({
      open: false,
    });
  },

  render: function() {
    return (
      <div>
        <div className="col tough span_1_of_2">
          <h2>Регистрация почтового адреса< /h2>
          <TextField
            onChange={this.handleCountryChange}
            errorText={this.state.countryErrorMessageText}
            floatingLabelText="Страна"
          / >
          <br / >
          <TextField
            onChange={this.handleSubjectChange}
            errorText={this.state.subjectErrorMessageText}
            hintText="Необязательное"
            floatingLabelText="Субъект"
          / >
          <br / >
          <TextField
            onChange={this.handleAreaChange}
            errorText={this.state.areaErrorMessageText}
            hintText="Необязательное"
            floatingLabelText="Область"
          / >
          <br / >
          <TextField
            onChange={this.handleCityChange}
            errorText={this.state.cityErrorMessageText}
            floatingLabelText="Город"
          / >
          <br / >
          <TextField
            onChange={this.handleStreetChange}
            errorText={this.state.streetErrorMessageText}
            floatingLabelText="Улица"
          / >
          <br / >
          <TextField
            onChange={this.handleBuildingChange}
            errorText={this.state.buildingErrorMessageText}
            floatingLabelText="Дом, строение"
          / >
          <br / >
          <TextField
            onChange={this.handleAppartmentChange}
            errorText={this.state.appartmentErrorMessageText}
            floatingLabelText="Квартира, офис"
          / >
          <br / >
          <TextField
            onChange={this.handleZipCodeChange}
            errorText={this.state.zipCodeErrorMessageText}
            floatingLabelText="Индекс"
          / >
          <br / >
          <TextField
            onChange={this.handlePhoneChange}
            errorText={this.state.phoneErrorMessageText}
            floatingLabelText="Телефон"
          / >
          <br / >
          <br / >
        {this.state.sending ?
          <div>
            <CircularProgress />
          </ div> :
          <FlatButton
            label="Зарегистрировать"
            secondary={true}
            onMouseDown={this.handleSubmit}
            disabled={this.submitDisable}
          / >}
        {this.state.open ?
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            action="Ok"
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
          /> : null}
        < /div>
        <div className="info-block col tough span_2_of_2">
          Регистрация почтового адреса на данном этапе не обязательна,
          но адрес может понадобиться нам для рассылки призов.
        < /div>
      < /div>
      );
  },
});

export default RegisterAddressForm;
