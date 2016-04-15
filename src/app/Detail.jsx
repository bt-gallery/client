import React from 'react';
import {browserHistory, Link} from 'react-router';
import ToGalleryBtn from './ToGalleryBtn';
import PhotoAPIUtils from './PhotoAPIUtils';

const Detail = React.createClass({
    getInitialState: function(){
        return {
            info: PhotoAPIUtils.getDetailInfo(this.props.params.id),
        };
    },
    render: function() {
        return <div className="detail-wrapper">
            <ToGalleryBtn />
         <div className="image-wrapper"><img className="detail-image" src={this.state.info.photo.webPath}/></div>
            <div className="detail">
                <p className="full-name">{this.state.info.participant.name} {this.state.info.participant.patronymic ? this.state.info.participant.patronymic : ''} {this.state.info.participant.surname}</p>
                <p className="year">{this.state.info.participant.year}</p>
                <p className="story">{this.state.info.participant.description}</p>
            </div>
        </div>;
    },
});
module.exports = Detail;