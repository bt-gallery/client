import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Superagent from 'superagent';
import CircularProgress from 'material-ui/lib/circular-progress';
import Snackbar from 'material-ui/lib/snackbar';
import isNull from 'validator/lib/isNull';
import isEmail from 'validator/lib/isEmail';
import FlatButton from 'material-ui/lib/flat-button';
import Photo from './Photo';

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
    let self = this;
    if (isNull(search)) {
      this.setState({searchErrorMessageText:"Заполните это поле"});
      return;
    }
    this.setState({sending:true});
    Superagent.get('/api/v1/search/bysurname')
      .query({q:search})
      .end(function(err, res) {
        if (!err && err == null) {
          console.log(res);
          if (res.body.data && res.body.meta) {
            console.log('setting party');
            self.setState({participantList:res.body.data});
          } else {
            console.log('show message');
            self.setState({snackBarOpen:true,snackBarMessage:'К сожалению, ничего не найдено.'});
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
            <Photo key={this.state.participantList[i].idContribution} id={this.state.participantList[i].idContribution} path={'http://foto1945.mir24.tv'+this.state.participantList[i].thumbWebPath} name={this.state.participantList[i].persons}/>
          );
    }
    return (
      <div className="formBlock">
        <div>
          <h2>Поиск ветерана< /h2>
          <div>
            <TextField
              floatingLabelText="Введите фамилию ветерана"
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
        <div>
        {this.state.sending ?
          <CircularProgress style={{marginLeft:5, position:"absolute"}} /> : null
          }
        {this.state.participantList.length ?
            <div className="masonry">{rows}< /div>:
          <div className='info-block searchtip'>
            Если Вы не находите фотографию, проверьте правильность написания фамилии.
          < /div>
        }
          <br />
        </ div>
      < /div>
      );
  },
});

export default SearchForm;
