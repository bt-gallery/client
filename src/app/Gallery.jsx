import React from 'react';
import Photo from './Photo';
import Buttons from './Buttons';
import PhotoAPIUtils from './PhotoAPIUtils';

const Gallery = React.createClass({
    getInitialState: function(){
        let elems = this.buildElements();
        return {
            elements:elems,
        }
    },
    buildElements: function(){
        let elements = [];
        let photos = PhotoAPIUtils.getPhotos();
        for (let i in photos){
            elements.push(<Photo id={photos[i]['id']} key={photos[i]['idParticipant']} path={photos[i]['webPath']} name={photos[i]['participantName']} surname={photos[i]['surname']} year={photos[i]['year']} info={photos[i]['participantDescription']}/>);
        }
        return elements;
    },
    render: function () {
        return  <div>
            <Buttons/>
        <div className="masonry">
            {this.state.elements}
        </div>
            </div>;
    },
});

module.exports = Gallery;