"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Link = require('react-router').Link;

var NotFoundPage = createReactClass({
    render: function(){
        return (
            <div>
                <h1>Page not found</h1>
                <p>Whoops! Sorry, there is nothing to see here.</p>
                <p><Link to="app">Back to Home</Link></p>
            </div>    
        );
    }
});

module.exports = NotFoundPage; 