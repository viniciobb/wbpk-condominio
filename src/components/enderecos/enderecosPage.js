"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EnderecoList from './enderecoList';
import EnderecoStore from '../../stores/enderecoStore';
import EnderecoActions from "../../actions/enderecoActions";

class EnderecosPage extends React.Component{

    constructor(props) {
        super(props);
        
        console.log("EnderecosPage constructor");

        this.state = {
            enderecos : []
        }; 

        this._onChange = this._onChange.bind(this);
        this.qtdeEnderecos = this.qtdeEnderecos.bind(this);
        this.showAddEnderecos = this.showAddEnderecos.bind(this);
    }

    componentDidMount(){

        
        
    }
    
    componentWillMount(){
        EnderecoStore.addChangeListener(this._onChange);

        console.log("EnderecosPage componentWillMount");

        //var enderecos = {};

        if(this.props.idCondominio){
            console.log("enderecoPage com id condominio");
            if(!EnderecoStore.getInitialized()){
                console.log("not inicialized");
                
                //this.setState({
                    this.state.enderecos = this.props.getEnderecos();
                //});
                
                console.dir(this.state.enderecos);
                
                EnderecoActions.carregaEnderecos(this.state.enderecos);


            }else{
                console.log("inicialized");
                
                this.setState({
                    enderecos: EnderecoStore.getEnderecos()
                });

            }

        }else{

            console.log("enderecoPage SEM id condominio");

            console.log("EnderecoStore.getSavedState()");
            console.log(EnderecoStore.getSavedState());

            if(EnderecoStore.getSavedState()){
                
                this.setState({
                    enderecos: EnderecoStore.getEnderecos()
                });
                
                console.dir(enderecos);

            }else{
                console.log("clean");
                EnderecoActions.cleanEndereco();

            }

        }
    }
    
    componentWillUnmount(){
        EnderecoStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
        console.log("on change enderecosPage");
        this.setState({ enderecos: EnderecoStore.getEnderecos()});
    }
    
    qtdeEnderecos(){
        
        var labelEndereco = "Endereços"
        if(this.props.qtdeEndereco == 1){
            labelEndereco = "Endereço"
        }
        return labelEndereco;

    }

    showAddEnderecos(){
        
        var showAddEnderecos = true; 
        
        if(this.state.enderecos.length >= this.props.qtdeEndereco){
            showAddEnderecos = false;
        }

        return showAddEnderecos;
    }

    render(){
        
        return (
            <div className="container">
               <h1 className="page-header">{this.qtdeEnderecos()}</h1>
               {this.showAddEnderecos() && <Link to={"/condominio/"+this.props.idCondominio+"/endereco"} className="btn btn-default">Adicionar Endereço</Link>}
               <EnderecoList 
                    enderecos={this.state.enderecos}
                    idCondominio={this.props.idCondominio}
                />   
            </div>    
        );
    }
};

EnderecosPage.propTypes= {
    getEnderecos: PropTypes.func.isRequired
}

module.exports = EnderecosPage;