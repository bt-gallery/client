import React from 'react';
import {browserHistory, Link} from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';


const Buttons = React.createClass({
    handleFindClick: function(){
        browserHistory.push("/search");
    },
    handleAddClick: function(){
        browserHistory.push("/declarant");
    },
    render: function() {
        return <div className="searchNadd">
            <RaisedButton label="Найти ветерана" labelColor="#FFF" style={{marginRight:10}}  backgroundColor='#86C5F3' onClick={this.handleFindClick}/>
            <RaisedButton label="Добавить фото из личного архива" labelColor="#FFF"  backgroundColor='#D66E6E' onClick={this.handleAddClick}/>
        </div>;
    },
});

module.exports = Buttons;