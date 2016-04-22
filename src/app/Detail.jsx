import React from 'react';
import {browserHistory, Link} from 'react-router';
import ToGalleryBtn from './ToGalleryBtn';
import PhotoAPIUtils from './PhotoAPIUtils';

const Detail = React.createClass({
    componentDidMount:function(){
        PhotoAPIUtils.addRecieveInfoListener(this.getInfo);
        PhotoAPIUtils.getDetailInfo(this.props.params.id);
    },
    componentWillUnmount:function(){
        PhotoAPIUtils.removeRecieveInfoListener(this.getInfo);
    },
    getInitialState: function(){
      return {
          info:'',
      }
    },
    getInfo:function(info){
        this.setState({
            info:info,
        });
    },
    render: function() {
        if (this.state.info) {
            return <div className="detail-wrapper">
                <ToGalleryBtn />
                <div className="image-wrapper"><img className="detail-image" src={this.state.info.webPath}/></div>
                <div className="detail">
                    <p className="full-name">{this.state.info.persons}</p>
                    <p className="story">{this.state.info.description}</p>
                </div>
            </div>;
        } else {
            return false;
        }
    },
});
module.exports = Detail;