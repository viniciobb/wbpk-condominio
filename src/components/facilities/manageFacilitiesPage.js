"use strict";
import React from 'react';
import FacilityForm from './facilityForm';
import FacilityStore from "../../stores/facilityStore";
import FacilityActions from "../../actions/facilityActions";
import Toastr from "toastr";

class ManageFacilitiesPage extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = this.getStateFromStores();
        this.state.errors= {};
        this.state.dirty= false;
        console.log(this.state);
        // this.state= {
        //     facility: {
        //         nomefacility: '',
        //         tempoReserva: '',
        //         disponibilidadeDia: '',
        //         disponibilidadeHora: '',
        //         valor: 0,
        //         regrasUso: '',
        //         id: ''
            
        //     },
        //     errors: {},
        //     dirty: false
        // };
        this.getStateFromStores = this.getStateFromStores.bind(this); 
        this._onChange = this._onChange.bind(this);
        this.setFacilityState = this.setFacilityState.bind(this);
        this.facilityFormIsValid = this.facilityFormIsValid.bind(this);
        this.saveFacility = this.saveFacility.bind(this);
        this.getIntervaloReserva = this.getIntervaloReserva.bind(this);
    } 

    getIntervaloReserva(){
        
        return ["Dia" , "Hora"];        

    }

    getStateFromStores() {
        return {
            facility:   FacilityStore.getFacility()
        };
    }
    
    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
     }
    
    _onChange(){
        console.log("onChange facilityPage");
        this.setState({ facility: FacilityStore.getFacility()});
    }

    componentWillMount(){
        
         FacilityStore.addChangeListener(this._onChange);
    }
   
        
    setFacilityState(event){ // called for every key press
        console.log("setFacilityState");
        console.dir(event);
        console.log(event.target.value);
        console.log(event.target.name);

        var field = event.target.name;
        var value = event.target.value;

        this.state.facility[field] = value;
        console.dir(this.state.facility);

        this.setState({ dirty: true });
        return this.state.facility;
    }

    
    
    saveFacility(event){ 
        event.preventDefault();
        if(!this.facilityFormIsValid()){
            return;
        }
        
        console.dir(this.state.facility);
        
        console.log(FacilityStore.getUpdate());

         if(FacilityStore.getUpdate()){

             FacilityActions.updateFacility(this.state.facility);

            }else{

            FacilityActions.createFacility(this.state.facility);

        }
               
        
        //console.log(this.props.params.idCondominio);
        //console.log(typeof(this.props.params.idCondominio));
        
        // if(this.props.match.params.idCondominio !== '0' || this.props.match.params.idCondominio !== 0)
            
        //     this.transitionTo('manageCondominio', {id: this.props.match.params.idCondominio});
            
        // else{
            
        //     console.log("******* iḿ going to addFacility");
            
        //     //this.transitionTo('addFacility');
        //     this.props.history.push("/addFacility");

        // } 
        
        this.props.history.push("/condominio");

    }

    facilityFormIsValid(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors
        if(this.state.facility.nomefacility.length < 1){
            this.state.errors.nomefacility = "nome facility must be filled.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    }

    
    /**
     * creating reusable inputs
     * 
     */
    render(){
        return (
            <FacilityForm 
             facility={this.state.facility} 
             intervaloReserva={this.getIntervaloReserva()}
             onChange={this.setFacilityState}
             onSave={this.saveFacility}
             errors={this.state.errors}
            /> 
        ); 
    }

};

module.exports = ManageFacilitiesPage; 