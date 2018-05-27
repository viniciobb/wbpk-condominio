"use strict";
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    render(){
        return (
            <div className="jumbotron">
                <h1>HeyCondominium Administration</h1>                
                <p> Reserve e controle.</p>
                <li><Link to="/about/">Learn more</Link></li>
            </div>
        );
    }

};

module.exports = Home; 