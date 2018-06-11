"use strict";
import React from 'react';
import {ButtonToolbar , ButtonGroup, Button, Glyphicon, FormGroup, Radio} from 'react-bootstrap';

class About extends React.Component{

    constructor(props) {
        super(props);
        this.defineActive = this.defineActive.bind(this);
        this.clickButton = this.clickButton.bind(this);
    }

    clickButton(number,event){
        console.log("i was clicked" + number);
        console.dir(event);
    }

    defineActive(number){
        var retorno = false;
        
        if( (number%2) == 0)
            retorno = true;

        return retorno;    

    }
    
    render(){

        return (
             
            
            <FormGroup>
                <Radio name="radioGroup" inline onClick={this.clickButton.bind(this,1)} >
                    1
                </Radio>
                <Radio name="radioGroup" inline onClick={this.clickButton.bind(this,2)}>
                    2
                </Radio>
                <Radio name="radioGroup" inline onClick={this.clickButton(this,3)}>
                    3
                </Radio>
            </FormGroup>

        );
    }

};

module.exports = About; 