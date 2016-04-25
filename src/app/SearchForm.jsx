import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Superagent from 'superagent';
import CircularProgress from 'material-ui/lib/circular-progress';
import Snackbar from 'material-ui/lib/snackbar';
import isNull from 'validator/lib/isNull';
import isEmail from 'validator/lib/isEmail';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
  marginLeft: 20,
};

let search="";
let rows=[];

const SearchForm = React.createClass({
  getInitialState : function() {
    return {
      sending:false,
      searchErrorMessageText:"",
      snackBarMessage:"",
      snackBarOpen:false,
      participantList:[],
    };
  },

  handleSubmit : function() {
    self = this;
    if (isNull(search)) {
      this.setState({searchErrorMessageText:"Введите корректный адрес электронной почты"});
      return;
    }
    if (!isEmail(search)) {
      this.setState({searchErrorMessageText:"Некорректный адрес электронной почты"});
      return;
    }
    this.setState({sending:true});
    Superagent.get('/api/v1/search/bymail')
      .query({q:search})
      .end(function(err, res) {
        if (!err && err == null) {
          console.log(res);
          if (res.body.length) {
            console.log('setting party');
            self.setState({participantList:res.body});
          } else {
            console.log('show message');
            self.setState({snackBarOpen:true,snackBarMessage:'Ничего не нашли. Можно зарегистрироваться еще раз.'});
          }
          self.setState({sending:false});
          console.log('finishing roll');
        } else {
          console.log(err);
          self.setState({snackBarOpen:true,snackBarMessage:'Ой! Ошибка.'});
          self.setState({sending:false});
        }
      });
  },

  handleSearchChange : function(event) {
    search = event.target.value;
  },

  handleRequestClose : function() {
    this.setState({snackBarOpen:false});
  },

  render : function() {
    rows = [];
    for (let i=0; i < this.state.participantList.length; i++) {
      rows.push(
        <tr key={i} >
          <td>{this.state.participantList[i].name} {this.state.participantList[i].surname}< /td>
          <td>{this.state.participantList[i].queue_num}< /td>
          <td>{this.state.participantList[i].result}< /td>
          <td>{this.state.participantList[i].notice}< /td>
          <td>
            <a href={this.state.participantList[i].web_url} target={'_blank'}>
              <img src={this.state.participantList[i].web_url} style={{maxWidth:100, maxHeight:100}} />
            </a>
          < /td>
        < /tr>
          );
    }
    return (
      <div className="formBlock">
        <div className="col tough span_1_of_2">
          <h2>Поиск по заявкам< /h2>
          <div>
            <TextField
              floatingLabelText="Введите электронную почту"
              errorText={this.state.searchErrorMessageText}
              onChange={this.handleSearchChange}
              style={style}
            / >
          </div>
          <div>
            <FlatButton
              label="Найти"
              onMouseDown={this.handleSubmit}
              style={{marginLeft:5}}
            />
          </div>
          <Snackbar
            open={this.state.snackBarOpen}
            message={this.state.snackBarMessage}
            action="Ok"
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
          />
        < /div>
        <div className="col tough span_2_of_2">
        {this.state.sending ?
          <CircularProgress style={{marginLeft:5, position:"absolute"}} /> : null
          }
        {this.state.participantList.length ?
          <table>
            <tbody>{rows}< /tbody>
          < /table> :
          <div className={'info-block'}>
            Если Вы не находите фотографию, проверьте адрес электронной почты.
          < /div>
        }
          <br />
        </ div>
      < /div>
      );
  },
});

export default SearchForm;
