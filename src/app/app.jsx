import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FrontPage from './FrontPage'; // Our custom react component
import RegisterDeclarantForm from './RegisterDeclarantForm'; // Our custom react component
import RegisterParticipantForm from './RegisterParticipantForm'; // Our custom react component
import Gallery from './Gallery';
import Detail from './Detail';
import SearchForm from './SearchForm';
import DashBoard from './DashBoard';
import {Router, Route, browserHistory} from 'react-router';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={FrontPage}>
      <Route path="/declarant" component={RegisterDeclarantForm} / >
      <Route path="/participant" component={RegisterParticipantForm} / >
      <Route path="/search" component={SearchForm} / >
      <Route path="/gallery" component={Gallery} / >
      <Route path="/photo/:id" component={Detail} />
    < /Route>
  < /Router>,
  document.getElementById('app'));
