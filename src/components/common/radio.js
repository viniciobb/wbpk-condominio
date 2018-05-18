"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var RadioButton = createReactClass({

    render: function(){
        
        var wrapperClass = 'form-group';
        if(this.props.error && this.props.error.length > 0){
            wrapperClass += " " + "has-error";
        }

        // var createRadioRow = function(option, index){
            
        //     console.dir(option);
            
        //     var idFacility = ( option.id ? option.id : index);
            
        //     return (
                
        //         <label>
        //             <input type="radio" name="optionsRadios" id="optionsRadios1" value="option" checked>
        //                 Option one is this and that&mdash;be sure to include why it's great
        //         </label>
        //     );
        // };
        
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                            Option one is this and that&mdash;be sure to include why it's great
                            </input>
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                            Option two can be something else and selecting it will deselect option one
                            </input>
                        </label>
                    </div>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
            
        ); 
    }

});

module.exports = RadioButton; 