import React from 'react';
import Store from './Store';
import RaisedButton from 'material-ui/lib/raised-button';
let EventEmitter = require('events').EventEmitter;
import PhotoAPIUtils from './PhotoAPIUtils';



const Pagination = React.createClass({

    eventEmitter: EventEmitter.prototype,

    handleBackClick: function(){
        this._onClick(20, this.props.prevPageOffset);
    },
    handleNextClick: function(){
        this._onClick(20, this.props.nextPageOffset);
    },
    _onClick: function(limit, offset){
        PhotoAPIUtils.getPhotos(limit,offset);
    },
    render: function() {
        if (this.props.total>20) {
            if (this.props.prevPageOffset>=0 && this.props.nextPageOffset<this.props.total) {
                return <div>
                    <RaisedButton label="Предыдущая" labelColor="#FFF" backgroundColor='#D66E6E' onClick={this.handleBackClick} style={{marginRight:10}}/>
                    <RaisedButton label="Следующая" labelColor="#FFF" backgroundColor='#D66E6E' onClick={this.handleNextClick}/>
                </div>;
            } else if (this.props.prevPageOffset>=0 && this.props.nextPageOffset>=this.props.total){
               return <div>
                   <RaisedButton label="Предыдущая" labelColor="#FFF" backgroundColor='#D66E6E' onClick={this.handleBackClick}/>
                </div>;
            } else if (this.props.prevPageOffset<0 && this.props.nextPageOffset<this.props.total){
                return <div>
                    <RaisedButton label="Следующая" labelColor="#FFF" backgroundColor='#D66E6E' onClick={this.handleNextClick}/>
                </div>;
            }
        }
         else {
            return false;
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