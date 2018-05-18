"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var Link = Router.Link;
var FacilityStore = require("../../stores/facilityStore");
var FacilityActions = require("../../actions/facilityActions");
var Toastr = require("toastr");

var FacilitiesList = createReactClass({
    
    //<td><Link to="manageEndereco" params={{idCondominio: this.props.idCondominio, idEndereco: endereco.id }}>{endereco.logradouro}</Link></td>
    
    propTypes: {
        facilities: React.PropTypes.array.isRequired
    },

     deleteFacility: function(facility, event){
         event.preventDefault();
         FacilityActions.deleteFacility(facility);
         Toastr.success("facility Deleted" + facility.nomefacility);
     },

    render: function(){
        
        var createFacilityRow = function(facility, index){
            
            console.dir(facility);
            
            var idFacility = ( facility.id ? facility.id : index);
            
            return (
                
                <tr>
                    <td><a href="#" onClick={this.deleteFacility.bind(this, facility)}>Delete</a></td>
                    <td><Link to="manageFacility" params={{ idCondominio: this.props.idCondominio, idFacility: idFacility }}>{facility.nomefacility}</Link></td>
                </tr>
            );
        };
        
        return (
            <div>
                <table className="table">
                <thead>
                    <th>Delete</th>
                    <th>Nome Facility</th>
                </thead>    
                    <tbody>
                        {this.props.facilities.map(createFacilityRow, this)}
                    </tbody>
                </table>    
            </div>    
        );
    }
});

module.exports = FacilitiesList;