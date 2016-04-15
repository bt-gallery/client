import React from 'react';
import {browserHistory, Link} from 'react-router';
import PhotoAPIUtils from './PhotoAPIUtils';

const Detail = React.createClass({
    getInitialState: function(){
        return {
            info: PhotoAPIUtils.getDetailInfo(this.params.id),
        };
    },
    render: function() {
        console.log(this.state);
        return <div>
            <img src={this.state.info.photo.webPath}/>
            <span>{this.state.info.participant.name}</span>
            <span>{this.state.info.participant.surname}</span>
            <span>{this.state.info.participant.year}</span>
            <span>{this.state.info.participant.description}</span>
        </div>;
    },
});
module.exports = Detail;