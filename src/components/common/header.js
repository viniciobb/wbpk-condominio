"use strict";
import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component{
    render(){
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <ul class="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/authors">Authors</Link></li>
                        <li><Link to="/condominios">Condomínios</Link></li> */} 
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </nav>

        );
    }

};

module.exports = Header; 