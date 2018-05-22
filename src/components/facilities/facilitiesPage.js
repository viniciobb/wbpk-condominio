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
        this.setState(getInitialState());
    } 
   
    getInitialState(){

        var facilities = [];

        console.log(this.props.idCondominio); 

        

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
        console.dir(facilities);

        return {
            facilities
        };
    }
    
    componentWillMount(){
        FacilityStore.addChangeListener(this._onChange);
    }
    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
        console.log("onChange facilityPage");
        this.setState({ facilities: FacilityStore.getFacilities()});
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