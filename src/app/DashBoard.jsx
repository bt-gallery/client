import React from 'react';
import {Link} from 'react-router';

const DashBoard = React.createClass({
  getInitialState : function() {
    return {
      sending: false,
      emailErrorMessageText : "",
      nameErrorMessageText: "",
      surnameErrorMessageText: "",
    };
  },

  render : function() {
    return (
      <div>
        <div className="tough info-block">
          <div style={{margin:"auto", padding:5}}>
            Уважаемые участники конкурса, прием заявок прекращен -
            голосование начнётся 1-го апреля в 16:00 по московскому времени.
          < /div>
          <div style={{margin:"auto",padding:5}}>
            Напоминаем вам, что каждый пользователь может проголосовать один раз в день в каждой из возрастных групп.
          < /div>
          <div style={{margin:50}}>
            <Link to={`/search`}>Поиск по заявкам< /Link>
          < /div>
        < /div>
      < /div>
      );
  },
});

export default DashBoard;
