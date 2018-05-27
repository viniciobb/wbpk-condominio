"use strict";
import React from 'react';
import CondominioForm from './condominioForm';
import CondominioStore from "../../stores/condominioStore";
import EnderecoStore from "../../stores/enderecoStore";
import FacilityStore from "../../stores/facilityStore";
import CondominioActions from "../../actions/condominioActions";
import EnderecoActions from "../../actions/enderecoActions";
import FacilityActions from "../../actions/facilityActions";
import Toastr from "toastr";

class ManageCondominioPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        console.dir(this.state.condominio);

        this.setCondominioState = this.setCondominioState.bind(this);
        this.condominioFormIsValid = this.condominioFormIsValid.bind(this);
        this.getEnderecos = this.getEnderecos.bind(this);
        this.getFacilities = this.getFacilities.bind(this);
        this.saveCondominio = this.saveCondominio.bind(this);
        
        
        
    }

    componentWillMount(){
       
        //EnderecoStore.addChangeListener(this._onChange);

        console.log("componentWillMount managerCondominio");

        console.dir(this.state.condominio);
       
        var condominioId = this.props.match.params.id; // from the path /condominio/:id

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
       
    }

    setCondominioState(event){ // called for every key press
        var field = event.target.name;
        var value = event.target.value;
        this.state.condominio[field] = value;
        
        this.setState({ dirty: true });
        return this.setState({ condominio: this.state.condominio});
    }
    
    condominioFormIsValid(){
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

    }

    getEnderecos(){
       
        return  CondominioStore.getEnderecosCondominio(this.props.params.id);

    }

    getFacilities(){
       
        return  CondominioStore.getFacilitiesCondominio(this.props.params.id);

    }

    saveCondominio(event){
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

        console.log("clean");
        
        EnderecoActions.cleanEndereco();
        
        console.log("clean");
        
        FacilityActions.cleanFacility();
        
        this.setState({ dirty: false });
        
        Toastr.success('Condominio saved.');
        
        this.transitionTo('condominios');

    }
    
    render(){
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

};

module.exports = ManageCondominioPage; 