"use strict";
import React from 'react';
import DropDown from "../common/dropDown";

class About extends React.Component{
    
    render(){
        return (

            <div>
                <h1>About</h1>                
                <p>
                    this application uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>Reat Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
                <DropDown 
                />
            </div>

        );
    }

};

module.exports = About; 