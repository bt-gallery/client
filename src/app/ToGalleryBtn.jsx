import React from 'react';
import {browserHistory, Link} from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';


const ToGalleryBtn = React.createClass({
    handleClick: function(){
        browserHistory.push("/gallery"); //TODO запоминать лимит и оффсет
    },
    render: function() {
        return <div className="to-gallery">
            <RaisedButton label="Вернуться в галерею" labelColor="#FFF" backgroundColor='#86C5F3' onClick={this.handleClick}/>
        </div>;
    },
});

module.exports = ToGalleryBtn;