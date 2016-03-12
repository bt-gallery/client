import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Ee from 'event-emitter';

const styles = {
  root: {
    marginLeft:50,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 400,
    height: "100%",
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const tilesData = [];


const ParticipantsList = React.createClass({
  getInitialState : function() {
    return {participants:tilesData.length};
  },
  componentDidMount : function() {
    Ee.methods.on('test',this.updateListener);
  },
  updateListener : function(args) {
    tilesData.push({
      img:args.webPath,
      name:args.name,
      surname:args.surname,
    });
    this.setState({participants:tilesData.length});
    console.log(args);
  },
  render : function() {
    return (
      <div style={styles.root}>
        <GridList
          cols={2}
          cellHeight={200}
          style={styles.gridList}
        >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.name}
          subtitle={tile.surname}
        >
          <img src={tile.img} />
        </GridTile>
        ))}
        </GridList>
      </div>
      );
  },
});

export default ParticipantsList;
