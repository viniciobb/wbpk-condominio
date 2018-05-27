"use strict";
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FacilitiesList from "./facilitiesList";
import FacilityStore from "../../stores/facilityStore";
import FacilityActions from "../../actions/facilityActions";


class FacilitiesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            facilities : []
        };

        this._onChange = this._onChange.bind(this);
        
    } 
    
    componentWillMount(){
        FacilityStore.addChangeListener(this._onChange);
    }
    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
    }

    componentDidMount(){

        if(this.props.idCondominio){
            
            if(!FacilityStore.getInitialized()){
                facilities = this.props.getFacilities(); 
                FacilityActions.carregaFacilities(facilities);

            }else{
                facilities = FacilityStore.getFacilities();
            }

        }else{
           

            if(FacilityStore.getSavedState()){

                facilities = FacilityStore.getFacilities();

            }else{

                FacilityActions.cleanFacility();

            }


        }

        console.log("facilities in facility page");
        console.dir(this.state.facilities);
    }
    
    _onChange(){
        console.log("onChange facilityPage");
        this.setState(function(prevState, props){
            return {
                facilities:  FacilityStore.getFacilities() 
            };            
        });
    }

    render(){
        
        return (
            <div className="container">
               <h1 className="page-header">Facilities Page</h1>
               <Link to="addFacility" params={{idCondominio: this.props.idCondominio}} className="btn btn-default">Adicionar Facility</Link>
               <FacilitiesList 
                    facilities={this.state.facilities}
                    idCondominio={this.props.idCondominio}
                />   
            </div>    
        );
    }
};

FacilitiesPage.propTypes= {
    getFacilities: PropTypes.func.isRequired
}

module.exports = FacilitiesPage;