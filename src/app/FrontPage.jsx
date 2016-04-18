import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {browserHistory} from 'react-router';


const styles = {
  container: {
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const FrontPage = React.createClass({
  propTypes : {
    children: React.PropTypes.node,
  },

  componentDidMount: function() {
    sessionStorage.clear();
    browserHistory.push("gallery");
  },

  render : function render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container} className="section group">
          {this.props.children}
        < /div>
      < /MuiThemeProvider>
      );
  },
});

export default FrontPage;
