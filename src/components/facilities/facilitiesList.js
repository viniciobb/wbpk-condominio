"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacilityStore from "../../stores/facilityStore";
import FacilityActions from "../../actions/facilityActions";
import Toastr from "toastr";

class FacilitiesList extends React.Component {
    
     deleteFacility(facility, event){
         event.preventDefault();
         FacilityActions.deleteFacility(facility);
         Toastr.success("facility Deleted" + facility.nomefacility);
     }

    render(){
        
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
};

FacilitiesList.propTypes={
    facilities: PropTypes.array.isRequired
}

module.exports = FacilitiesList;