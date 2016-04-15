import React from 'react';
import Store from './Store';
import RaisedButton from 'material-ui/lib/raised-button';
let EventEmitter = require('events').EventEmitter;
import PhotoAPIUtils from './PhotoAPIUtils';



const Pagination = React.createClass({ //TODO Эмиттить ченч

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
        return <div>
            <RaisedButton label="Предыдущая" primary={true} onClick={this.handleBackClick}/>
            <RaisedButton label="Следующая" primary={true} onClick={this.handleNextClick}/>
        </div>;
    },
});

Pagination.addPaginateListener = function(callback) {
    EventEmitter.prototype.on('paginate', callback);
};
Pagination.removePaginateListener = function(callback){
    EventEmitter.prototype.removeListener('paginate', callback);
};

module.exports = Pagination;