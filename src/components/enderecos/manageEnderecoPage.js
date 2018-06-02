"use strict";
import React from 'react';
import EnderecoForm from './enderecoForm';
import EnderecoStore from "../../stores/enderecoStore";
import EnderecoActions from "../../actions/enderecoActions";
import Toastr from "toastr";

class ManageEnderecoPage extends React.Component {
    
    
    constructor(props) {
        super(props);
        console.log("ManageEnderecoPage constructor");
        this.state = {
            endereco: {
                logradouro: '',
                numero: 0,
                complemento: '',
                bairro: '',
                cep: 0,
                siglaFederacao: '',
                cidade: '',
                estado: '',
                id: ''
            
            },
            errors: {},
            dirty: false
        };

        this._onChange = this._onChange.bind(this);
        this.afterIncludeEndereco = this.afterIncludeEndereco.bind(this);
        this.buscaEndereco = this.buscaEndereco.bind(this);
        this.saveEndereco = this.saveEndereco.bind(this);
        this.setEnderecoState = this.setEnderecoState.bind(this);
        this.enderecoFormIsValid = this.enderecoFormIsValid.bind(this);
    }
    
    componentWillUnmount(){
        EnderecoStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
        console.log("onChange");
        this.setState({ endereco: EnderecoStore.getEndereco()});
    }

    buscaEndereco(){
        event.preventDefault();
        EnderecoActions.buscaEndereco(this.state.endereco.cep);
    }

    // statics: {

    //     willTransitionFrom: function(transition, component){
    //         if( component.state.dirty && !confirm("Leave without saving ?")){
    //             transition.abort();
    //         }    
    //     }

    // },

    componentDidMount(){
        
        if(this.props.match.params.idEndereco){
          
            console.log("id endereco") ;
            console.log(this.props.match.params.idEndereco);
            this.state.endereco = EnderecoStore.getEnderecoByIndex(this.props.match.params.idEndereco);                
            console.dir(this.state.endereco);

        }

    }

    componentWillMount(){
        
        EnderecoStore.addChangeListener(this._onChange);
    }
        
    setEnderecoState(event){ // called for every key press
        var field = event.target.name;
        var value = event.target.value;
        

        
        //console.log("field : " + field);
        //console.log("value : " + value);


        this.state.endereco[field] = value;

        //console.dir(this.state.endereco);
        //console.log("typed : " + value);
        this.setState({ dirty: true });
        return this.state.endereco;
    }

    afterIncludeEndereco(){
        
        if(this.props.match.params.idCondominio)
            
            this.props.history.push("/condominio/"+this.props.match.params.idCondominio);

            //this.transitionTo('manageCondominio', {id: this.props.params.match.idCondominio});
            
        else{
            
            this.props.history.push("/condominio");

        }

    }
    
    saveEndereco(event){ 
        event.preventDefault();

        if(!this.enderecoFormIsValid()){
            return;
        }


        if(this.props.match.params.idEndereco){

            EnderecoActions.updateEndereco(this.state.endereco, this.props.match.params.idEndereco);

        }else{

            EnderecoActions.createEndereco(this.state.endereco);

        }
               
        this.afterIncludeEndereco();
            

    }

    enderecoFormIsValid(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors
        if(this.state.endereco.logradouro.length < 1){
            this.state.errors.logradouro = "logradouro must be filled.";
            formIsValid = false;
        }

        if(this.state.endereco.cep.length < 3){
            this.state.errors.cep = "CEP must be filled.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    }

 
    render(){
        return (
            <EnderecoForm 
             endereco={this.state.endereco} 
             onChange={this.setEnderecoState}
             onSave={this.saveEndereco}
             onBusca={this.buscaEndereco}
             errors={this.state.errors} />
        ); 
    }

};

module.exports = ManageEnderecoPage; 