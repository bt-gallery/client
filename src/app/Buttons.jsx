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
        return <div>
            <RaisedButton label="Найти ветерана" primary={true} onClick={this.handleFindClick} style={{marginRight: 10}}/>
            <RaisedButton label="Добавить фото из личного архива" secondary={true} onClick={this.handleAddClick}/>
        </div>;
    },
});

module.exports = Buttons;