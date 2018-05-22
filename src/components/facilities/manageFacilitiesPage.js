"use strict";
import React from 'react';
import FacilityForm from './facilityForm';
import FacilityStore from "../../stores/facilityStore";
import FacilityActions from "../../actions/facilityActions";

var Toastr = require("toastr");

var ManageFacilitiesPage = createReactClass({

    
     componentWillUnmount : function(){
        FacilityStore.removeChangeListener(this._onChange);
     },
    
    _onChange : function(){
        console.log("onChange facilityPage");
        this.setState({ facility: FacilityStore.getFacility()});
    },

    getInitialState: function(){
        console.log("getInitialState ManageFacilityPage");
        return {
            facility: {
                nomefacility: '',
                tempoReserva: '',
                disponibilidadeDia: '',
                disponibilidadeHora: '',
                valor: 0,
                regrasUso: '',
                id: ''
            
            },
            errors: {},
            dirty: false
        };
    },

    

    mixins: [
        Router.Navigation
    ],

    statics: {

        willTransitionFrom: function(transition, component){
            if( component.state.dirty && !confirm("Leave without saving ?")){
                transition.abort();
            }    
        }

    },

    componentWillMount: function(){
        
        FacilityStore.addChangeListener(this._onChange);
       
        console.log("componentWillMount managerFacility");
        console.log(this.props.params.idCondominio);
        console.log(this.props.params.idFacility);
        

        if(this.props.params.idFacility){
            
          this.setState({facility: FacilityStore.getFacilityById(this.props.params.idFacility)});

        }
        console.log("this.state.facility");
        console.dir(this.state.facility);

    },

    getTempoReserva: function(){

        return ["Dia", "Hora" ];

    },
        
    setFacilityState: function(event){ // called for every key press
        var field = event.target.name;
        var value = event.target.value;
        

        
        console.log("field : " + field);
        console.log("value : " + value);


        this.state.facility[field] = value;

        console.dir(this.state.facility);


        console.log("typed : " + value);
        this.setState({ dirty: true });
        return this.state.facility;
    },
    
    saveFacility: function(event){ 
        event.preventDefault();
        if(!this.facilityFormIsValid()){
            return;
        }
        
        console.dir(this.state.facility);
        

        if(this.props.params.idFacility){

            FacilityActions.updateFacility(this.state.facility, this.props.params.idFacility);

        }else{

            FacilityActions.createFacility(this.state.facility);

        }
               
        
        console.log(this.props.params.idCondominio);
        console.log(typeof(this.props.params.idCondominio));
        
        if(this.props.params.idCondominio !== '0' || this.props.params.idCondominio !== 0)
            
            this.transitionTo('manageCondominio', {id: this.props.params.idCondominio});
            
        else{
            
            console.log("******* iḿ going to addFacility");
            
            this.transitionTo('addFacility');

        }    

    },


    facilityFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors
        if(this.state.facility.nomefacility.length < 1){
            this.state.errors.nomefacility = "nome facility must be filled.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    },

    
    /**
     * creating reusable inputs
     * 
     */
    render: function(){
        return (
            <FacilityForm 
             facility={this.state.facility} 
             onChange={this.setFacilityState}
             tempoReservaOptions= {this.getTempoReserva()} 
             onSave={this.saveFacility}
             errors={this.state.errors}
            /> 
        ); 
    }

});

module.exports = ManageFacilitiesPage; 