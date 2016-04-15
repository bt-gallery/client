import React from 'react';
import Store from './Store';
import RaisedButton from 'material-ui/lib/raised-button';

const Pagination = React.createClass({ //TODO Эмиттить ченч
    handleBackClick: function(){
        this._onClick(10, this.props.prevPageOffset);
    },
    handleNextClick: function(){
        this._onClick(10, this.props.nextPageOffset);
    },

    _onClick: function(limit, offset){
        //emit
    },
    render: function() {
        return <div>
            <RaisedButton label="Предыдущая" primary={true} onClick={this.handleBackClick}/>
            <RaisedButton label="Следующая" primary={true} onClick={this.handleNextClick}/>
        </div>;
    },
});

module.exports = Pagination;