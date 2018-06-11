"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Radio} from 'react-bootstrap';

class RadioButton extends React.Component{

    constructor(props) {
        super(props);
        this.clickRadio = this.clickRadio.bind(this);
        
    }

    clickRadio(radioItem, event){
        console.log("i was clicked " + radioItem);
        console.dir(event);
        //event.target.name = this.props.name;
        //event.target.value = radioItem;
        //console.dir(event);
        
        // var event = {};
        // event.target = {};

        // event.target.name = this.props.name;
        // console.log(" event " + event.target.name);
        // console.dir(event);

        // event.target.value = radioItem;
        // console.log(" event " + event.target.value);
        // console.dir(event);

        //console.log(this.props.onChange);
        this.props.onChange(radioItem);

    }

    setGender(event) {
        console.dir(event);
        console.log(event.target.value);
        console.log(event.target.name);

    }

    render(){

        var wrapperClass = 'form-group';
        if(this.props.error && this.props.error.length > 0){
            wrapperClass += " " + "has-error";
        }
                
        var createRadioRow = function(radioItem, event){
            
            console.log("create Radio row event");
            console.dir(event);
            
            return (
                
                <label className="radio-inline">
                    <input type="radio" value={radioItem} checked={this.props.checked == radioItem} name={this.props.name} />
                        {radioItem}
                </label>
                
            );
        };
        
        return (

            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <FormGroup>
                    <div onChange={this.props.onChange}>
                        {this.props.value.map(createRadioRow, this)}     
                    </div>
                </FormGroup>
            </div>

            
        ); 
    }

}

module.exports = RadioButton; 