import React from 'react';
import Dropzone from 'react-dropzone';
import Superagent from 'superagent';
import Ee from 'event-emitter';

const style = {width:254,height:254,border:"2px dashed lightgrey"};

const infoStyle = {
  fontSize: 21,
  color: 'grey',
  position: 'absolute',
  width: 256,
  zIndex: -1,
};

const ImageZone = React.createClass({
  getInitialState: function() {
    return {
      files: [],
    };
  },

  componentDidMount: function() {
    Ee.methods.on('workBinded',this.onWorkBinded);
  },

  onDrop: function(files) {
    self = this;
    Superagent.post('/api/v1/competitive-work/upload/')
    .attach('image',files[0])
    .end(function(err, res) {
      if (res && res.body && res.body.length && res.body[0].success) {
        sessionStorage.setItem(
          'idCompetitiveWork', res.body[0].success.idCompetitiveWork
          );
        sessionStorage.setItem(
          'webPath', res.body[0].success.webPath
          );
      } else {
        self.setState({open:true, error:'Ой! Ошибка.'});
      }
      console.log(err);
      console.log(res);
    });
    this.setState({
      files: files,
    });
  },

  onWorkBinded: function() {
    this.setState({files:[]});
  },

  render: function() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} style={style}>
          <div style={infoStyle}>Кликните или перетащите сюда файл с рисунком</div>
          {this.state.files.length > 0 ? <div>
            <div>
              {this.state.files.map((file, index) =>
                <img
                  key={index} src={file.preview} style={{maxWidth:256,maxHeight:256}}
                /> )}
            </div>
          </div> : null}
        </Dropzone>
      </div>
    );
  },
});

export default ImageZone;
