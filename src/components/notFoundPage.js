"use strict";
import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component{
    render(){
        return (
            <div>
                <h1>Page not found</h1>
                <p>Whoops! Sorry, there is nothing to see here.</p>
                <p><Link to="/">Back to Home</Link></p>
            </div>    
        );
    }
};

module.exports = NotFoundPage; 