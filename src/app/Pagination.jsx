import React from 'react';
import Store from './Store';
import RaisedButton from 'material-ui/lib/raised-button';
let EventEmitter = require('events').EventEmitter;
import PhotoAPIUtils from './PhotoAPIUtils';



const Pagination = React.createClass({

    eventEmitter: EventEmitter.prototype,

    handleBackClick: function(){
        this._onClick(10, this.props.prevPageOffset);
    },
    handleNextClick: function(){
        this._onClick(10, this.props.nextPageOffset);
    },
    _onClick: function(limit, offset){
        PhotoAPIUtils.getPhotos(limit,offset);
    },
    render: function() {
        if (this.props.prevPageOffset===0) {
            return <div>
                <RaisedButton label="Следующая" labelColor="#FFF" backgroundColor='#A20000' onClick={this.handleNextClick}/>
            </div>;
        } else if (this.props.nextPageOffset===0) {
            return <div>
                <RaisedButton label="Предыдущая" labelColor="#FFF" backgroundColor='#A20000' onClick={this.handleBackClick}/>
            </div>;
        } else {
            return <div>
                <RaisedButton label="Предыдущая" onClick={this.handleBackClick} labelColor="#FFF"  backgroundColor='#A20000' style={{marginRight: 10}}/>
                <RaisedButton label="Следующая" onClick={this.handleNextClick} labelColor="#FFF"  backgroundColor='#A20000'/>
            </div>;
        }
    },
});

Pagination.addPaginateListener = function(callback) {
    EventEmitter.prototype.on('paginate', callback);
};
Pagination.removePaginateListener = function(callback){
    EventEmitter.prototype.removeListener('paginate', callback);
};

module.exports = Pagination;