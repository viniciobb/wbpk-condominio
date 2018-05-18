"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var Link = Router.Link;

var Home = createReactClass({
    render: function(){
        return (
            <div className="jumbotron">
                <h1>HeyCondominium Administration</h1>                
                <p> Reserve e controle.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }

});

module.exports = Home; 