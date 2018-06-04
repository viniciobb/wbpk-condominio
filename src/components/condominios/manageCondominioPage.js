"use strict";
import React from 'react';
import CondominioForm from './condominioForm';
import CondominioStore from "../../stores/condominioStore";
import EnderecoStore from "../../stores/enderecoStore";
import FacilityStore from "../../stores/facilityStore";
import CondominioActions from "../../actions/condominioActions";
import Toastr from "toastr";

class ManageCondominioPage extends React.Component {

    constructor(props) {
        super(props);
        console.log("ManageCondominioPage constructor");
        this.state = this.getStateFromStores();
        this.state.errors= {};
        this.state.dirty= false;
       
        console.log(this.state);
        
        this.setCondominioState = this.setCondominioState.bind(this);
        this.condominioFormIsValid = this.condominioFormIsValid.bind(this);
        //this.getEnderecos = this.getEnderecos.bind(this);
        //this.getFacilities = this.getFacilities.bind(this);
        this.afterSavingCondominio = this.afterSavingCondominio.bind(this);
        this.saveCondominio = this.saveCondominio.bind(this);
        this.getStateFromStores = this.getStateFromStores.bind(this); 
        
    }

    getStateFromStores() {
        
        var condominio = CondominioStore.getStateCondominio();
        var enderecos =  EnderecoStore.getEnderecos();
        var facilities =  FacilityStore.getFacilities();
        
        condominio.enderecos = {};
        condominio.enderecos = enderecos;
        condominio.facilities = {};
        condominio.facilities = facilities;
        
        return {
          condominio: condominio
        };
    }
    

    componentDidMount(){
        
        // console.log("componentDidMount managerCondominio");
        // var condominioId = this.props.match.params.id; // from the path /condominio/:id
        // if(condominioId && condominioId != '0' ){
        //     this.setState({condominio: CondominioStore.getCondominioById(condominioId)});
        // }else{
        //     var condominioState = CondominioStore.getStateCondominio();
        //     if(condominioState){
        //         this.setState({condominio: condominioState});                
        //     }
        //     else{
        //         //this.setState({condominio: CondominioStore.getNewCondominio()});                
        //     //    if(EnderecoStore.getSavedState()){
        //     //        this.state.condominio.enderecos = EnderecoStore.getEnderecos();
        //     //    }

        //     //    if(FacilityStore.getSavedState()){
        //     //     this.state.condominio.facilities = FacilityStore.getFacilities();
        //     //    }
        //     }
        // }
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

     afterSavingCondominio(){
         console.log("saveCondominio");
         this.setState({ dirty: false });
         Toastr.success('Condominio saved.');
         this.props.history.push("/condominios");
     }

    //componentWillUnmount(){
        //EnderecoStore.removeChangeListener(this._onChange);
    //}
    
    // _onChange(){
    //     console.log("onChange manage condominio");
    //     console.dir(this.state);
    //     console.dir(EnderecoStore.getEnderecos());
    //     this.state.condominio.enderecos = EnderecoStore.getEnderecos();
    // }

    // componentWillMount(){

    //     EnderecoStore.addChangeListener(this._onChange);
    // }    


    // getEnderecos(){   
       
    //     console.log("get enderecos");

    //     console.log(this.props.match.params.id);
        
    //     console.dir(CondominioStore.getEnderecosCondominio(this.props.match.params.id));

    //     return  CondominioStore.getEnderecosCondominio(this.props.match.params.id); 

    // }

    // getFacilities(){
       
    //     return  CondominioStore.getFacilitiesCondominio(this.props.match.params.id);

    // }
    saveCondominio(event){
        event.preventDefault();
        if(!this.condominioFormIsValid()){
            return;
        }

        //this.state.condominio.enderecos = EnderecoStore.getEnderecos();
        //this.state.condominio.facilities = FacilityStore.getFacilities();

        if(this.state.condominio.id)
        {
            CondominioActions.updateCondominio(this.state.condominio, this.afterSavingCondominio);

        }else{

            CondominioActions.createCondominio(this.state.condominio, this.afterSavingCondominio);

        }

    }
    
    render(){
        return (
            <CondominioForm 
             condominio={this.state.condominio} 
             onChange={this.setCondominioState}
             history={this.props.history}
             onSave={this.saveCondominio}
             errors={this.state.errors} />
        ); 
    }

};

module.exports = ManageCondominioPage; 