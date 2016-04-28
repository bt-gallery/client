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
            <RaisedButton label="Добавить фото из личного архива" labelColor="#FFF"  backgroundColor='#A20000' onClick={this.handleAddClick}/>
        </div>;
    },
});

module.exports = Buttons;
