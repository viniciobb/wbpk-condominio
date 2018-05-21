"use strict";
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {/* <li><Link to="/condominios">Condomínios</Link></li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                </nav>
            </div>

        );
    }

};

module.exports = Header; 