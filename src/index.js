// import React from 'react';
// import ReactDOM from 'react-dom';


// import App from './components/App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );


"use strict";
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require("./actions/initializeActions");

InitializeActions.initApp();

Router.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('app'));
}); 