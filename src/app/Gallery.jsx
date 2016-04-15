import React from 'react';
import Photo from './Photo';
import Buttons from './Buttons';
import Store from './Store';
import Pagination from './Store';
import PhotoAPIUtils from './PhotoAPIUtils';

const Gallery = React.createClass({
    componentDidMount: function(){
        Store.addChangeListener(this._onChange);
        PhotoAPIUtils.getPhotos(20,0);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);
    },

    getInitialState: function(){
        return {
            prevPageOffset:0,
            nextPageOffset:20,
        }
    },
    _onChange: function (prev, next) {
        let raw = Store.getAll();
        this.setState({
            rawPhotos: this.buildElements(raw),
            prevPageOffset:prev,
            nextPageOffset:next,
        });
    },
    buildElements: function(){
        let elements = [];
        let photos = this.state.rawPhotos;
        for (let i in photos){
            elements.push(<Photo id={photos[i]['id']} key={photos[i]['idParticipant']} path={photos[i]['webPath']} name={photos[i]['participantName']} surname={photos[i]['surname']} year={photos[i]['year']} info={photos[i]['participantDescription']}/>);
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
                <Pagination prevPageOffset={this.state.prevPageOffset} nextPageOffset={this.state.nextPageOffset}/>
            </div>;
        } else return false;
    },
});

module.exports = Gallery;