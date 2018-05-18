"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var CondominioForm = require('./condominioForm');
var CondominioStore = require("../../stores/condominioStore");
var EnderecoStore = require("../../stores/enderecoStore");
var FacilityStore = require("../../stores/facilityStore");
var CondominioActions = require("../../actions/condominioActions");
var EnderecoActions = require("../../actions/enderecoActions");
var FacilityActions = require("../../actions/facilityActions");

var Toastr = require("toastr");

var ManageCondominioPage = createReactClass({
    mixins: [
        Router.Navigation
    ],

    statics: {

        willTransitionFrom: function(transition, component){
            if( component.state.dirty){
               
                CondominioActions.saveStateCondominio(component.state.condominio);    
            }    
        }

    },
    
     componentWillUnmount : function(){

     },
    
    // _onChange : function(){
    //     console.log("onChange EnderecoStore");
    //     this.state.condominio.enderecos = EnderecoStore.getEnderecos();
    //     this.setState({ condominio: this.state.condominio });
    // },

    getInitialState: function(){
        console.log("getInitialState managerCondominio");
        return {
            condominio: {
    
                nome: '',
                cnpj: 0,
                quantidadeApartamentos: 0,
                quantidadeBlocos: 0,
                quantidadeElevadores: 0,
                quantidadeVagas: 0,
                id: 0,
                enderecos: [],
                facilities: []
            
            },
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function(){
       
        //EnderecoStore.addChangeListener(this._onChange);

        console.log("componentWillMount managerCondominio");
       
        var condominioId = this.props.params.id; // from the path /condominio/:id
        
        

        if(condominioId && condominioId != '0' ){
           

            this.setState({condominio: CondominioStore.getCondominioById(condominioId)});
        }else{

            var condominioState = CondominioStore.getStateCondominio();

            if(condominioState){
                this.setState({condominio: condominioState});                
            }
            else{
                
               if(EnderecoStore.getSavedState()){
                   this.state.condominio.enderecos = EnderecoStore.getEnderecos();
               }

               if(FacilityStore.getSavedState()){
                this.state.condominio.facilities = FacilityStore.getFacilities();
               }
                

            }

        }
       
    },

     setCondominioState: function(event){ // called for every key press
        var field = event.target.name;
        var value = event.target.value;
        this.state.condominio[field] = value;
        
        this.setState({ dirty: true });
        return this.setState({ condominio: this.state.condominio});
    },
    condominioFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors
        if(this.state.condominio.nome.length < 1){
            this.state.errors.firstName = "Name must be filled.";
            formIsValid = false;
        }

        if(this.state.condominio.cnpj.length < 3){
            this.state.errors.cnpj = "CNPJ must be filled.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    },

    getEnderecos: function(){
       
        return  CondominioStore.getEnderecosCondominio(this.props.params.id);

    },

    getFacilities: function(){
       
        return  CondominioStore.getFacilitiesCondominio(this.props.params.id);

    },

    saveCondominio: function(event){
        event.preventDefault();
        if(!this.condominioFormIsValid()){
            return;
        }

        this.state.condominio.enderecos = EnderecoStore.getEnderecos();

        this.state.condominio.facilities = FacilityStore.getFacilities();

        if(this.state.condominio.id)
        {
            CondominioActions.updateCondominio(this.state.condominio);

        }else{
            CondominioActions.createCondominio(this.state.condominio);
            console.log("saveCondominio");
        }

        EnderecoActions.cleanEndereco();
        FacilityActions.cleanFacility();
        
        this.setState({ dirty: false });
        
        Toastr.success('Condominio saved.');
        
        this.transitionTo('condominios');

    },

    

    /**
     * creating reusable inputs
     * 
     */
    render: function(){
        return (
            <CondominioForm 
             condominio={this.state.condominio} 
             onChange={this.setCondominioState}
             onSave={this.saveCondominio}
             getEnderecos={this.getEnderecos}
             getFacilities={this.getFacilities}
             errors={this.state.errors} />
        ); 
    }

});

module.exports = ManageCondominioPage; 