/*eslint-disable strict */ // disabling check because qe cant run strict mode . we need global vars

import React from 'react';
import Header from './common/header';
import Main from  './main';
//var RouteHandler = require('react-router').RouteHandler;
//$ = jQuery = require('jquery');

class App extends React.Component{
    
    render() {

        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <Main />
                </div>  
            </div>
        );

    }
    
};

module.exports = App;