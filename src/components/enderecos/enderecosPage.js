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

        this.state = this.getStateFromStores(); 
        console.log(this.state.enderecos);

        //this._onChange = this._onChange.bind(this);
        this.qtdeEnderecos = this.qtdeEnderecos.bind(this);
        this.showAddEnderecos = this.showAddEnderecos.bind(this);
        //this.condicaoCarregaEnderecos = this.condicaoCarregaEnderecos.bind(this);
        this.getStateFromStores = this.getStateFromStores.bind(this);
        this._onClick = this._onClick.bind(this);
    }
    
    _onClick(){
        console.log("_onClick");
        EnderecoActions.clickNewEndereco();
        console.log(this.props.history);
        this.props.history.push("condominio/endereco");   
        // todo go to manageEndereco     
    }

    getStateFromStores() {
        return {
          enderecos: EnderecoStore.getEnderecos()
        };
    }

    componentDidMount(){
      
        
    }
    
    
    qtdeEnderecos(){
        
        var labelEndereco = "Endereços"
        if(this.props.qtdeEndereco == 1){
            labelEndereco = "Endereço";
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
               {/* <div><a href="#" onClick={this._onClick.bind(this)}>Adicionar Condomínio</a></div> */}
               { this.showAddEnderecos() && <div><a href="#" onClick={this._onClick}>Adicionar Endereço</a></div>}
               {/* {this.showAddEnderecos() && <Link to={"/condominio/"+this.props.idCondominio+"/endereco"} className="btn btn-default">Adicionar Endereço</Link>} */}
               <EnderecoList 
                    enderecos={this.state.enderecos}
                />   
            </div>    
        );
    }
};

EnderecosPage.propTypes= {
    enderecos: PropTypes.object.isRequired
}

module.exports = EnderecosPage;