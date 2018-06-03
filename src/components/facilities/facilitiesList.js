"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacilityStore from "../../stores/facilityStore";
import FacilityActions from "../../actions/facilityActions";
import Toastr from "toastr";

class FacilitiesList extends React.Component {

    constructor(props) {
        super(props);

        console.log("FacilitiesList constructor");

      //this.state = {
        //  enderecos: this.props.enderecos
      //};

      this.deleteFacility =  this.deleteFacility.bind(this);
      this._onClick =  this._onClick.bind(this);

    }
    
    _onClick(facility, index , event){
        event.preventDefault();
        console.log(facility);
        FacilityActions.clickFacility(facility, index);
        this.props.history.push("condominio/facility");
    }
    
     deleteFacility(facility, event){
         event.preventDefault();
         FacilityActions.deleteFacility(facility);
         Toastr.success("Facility Apagada");
     }

    render(){
        
        var createFacilityRow = function(facility, index){
            
            // console.dir(facility);
            
            // var idFacility = ( facility.id ? facility.id : index);
            
            return (
                
                <tr>
                    <td><a href="#" onClick={this.deleteFacility.bind(this, facility)}>Delete</a></td>
                    {/* <td><Link to="manageFacility" params={{ idCondominio: this.props.idCondominio, idFacility: idFacility }}>{facility.nomefacility}</Link></td> */}
                    <td><a href="#" onClick={this._onClick.bind(this, facility, index)}>{facility.nomefacility}</a></td>
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