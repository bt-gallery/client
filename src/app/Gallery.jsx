import React from 'react';
import Photo from './Photo';
import Buttons from './Buttons';
import Store from './Store';
import Pagination from './Pagination';
import PhotoAPIUtils from './PhotoAPIUtils';

const Gallery = React.createClass({
    elements: [],
    componentDidMount: function(){
        Store.addChangeListener(this._onChange);
        PhotoAPIUtils.getPhotos(2,0);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);
    },

    getInitialState: function(){
        return {
            elements:[],
            prevPageOffset:0,
            nextPageOffset:20,
            total:0,
        }
    },
    _onChange: function (prev, next, total) {
        let raw = Store.getAll();
        let builded = this.buildElements(raw);
        this.setState({
            elements: builded,
            prevPageOffset:prev,
            nextPageOffset:next,
            total: total,
        });
    },
    buildElements: function(photos){
        let elements = [];
        for (let i in photos){
            elements.push(<Photo id={photos[i]['id']} key={photos[i]['id']} path={photos[i]['webPath']} name={photos[i]['participantName']} surname={photos[i]['surname']} year={photos[i]['year']} info={photos[i]['participantDescription']}/>);
        }
        return elements;
    },
    render: function () {
        if (this.state.elements) {
            return <div>
                <Buttons/>
                <div className="masonry">
                    {this.state.elements}
                </div>
                <Pagination prevPageOffset={this.state.prevPageOffset} nextPageOffset={this.state.nextPageOffset} total={this.state.total}/>
            </div>;
        } else return false;
    },
});

module.exports = Gallery;