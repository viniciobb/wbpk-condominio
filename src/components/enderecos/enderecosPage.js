"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EnderecoList from './enderecoList';
import EnderecoStore from '../../stores/enderecoStore';
import EnderecoActions from "../../actions/enderecoActions";

class EnderecosPage extends React.Component{

    // statics: {

    //     willTransitionFrom: function(transition, component){
    //         // if( component.state.dirty && !confirm("Leave without saving ?")){
    //         //     transition.abort();
    //         // }    
    //     }

    // },
    
    getInitialState: function(){

        var enderecos = [];

        console.log(this.props.idCondominio); 

        

        if(this.props.idCondominio){
            
            if(!EnderecoStore.getInitialized()){
                enderecos = this.props.getEnderecos(); 
                EnderecoActions.carregaEnderecos(enderecos);

            }else{
                enderecos = EnderecoStore.getEnderecos();
            }

        }else{

            console.log("EnderecoStore.getSavedState()");
            console.log(EnderecoStore.getSavedState());

            if(EnderecoStore.getSavedState()){

                enderecos = EnderecoStore.getEnderecos();

            }else{

                EnderecoActions.cleanEndereco();

            }

        }

        return {
            enderecos
        };
    },
    
    componentWillMount : function(){
        EnderecoStore.addChangeListener(this._onChange);
    },
    componentWillUnmount : function(){
        EnderecoStore.removeChangeListener(this._onChange);
    },
    
    _onChange : function(){
        console.log("onChange enderecoPage");
        this.setState({ enderecos: EnderecoStore.getEnderecos()});
    },
    
    qtdeEnderecos : function(){
        
        var labelEndereco = "Endereços"
        if(this.props.qtdeEndereco == 1){
            labelEndereco = "Endereço"
        }
        return labelEndereco;

    },

    showAddEnderecos : function(){
        
        var showAddEnderecos = true; 
        
        if(this.state.enderecos.length >= this.props.qtdeEndereco){
            showAddEnderecos = false;
        }

        return showAddEnderecos;
    },

    render(){
        
        return (
            <div className="container">
               <h1 className="page-header">{this.qtdeEnderecos()}</h1>
               {this.showAddEnderecos() && <Link to="addEndereco" params={{idCondominio: this.props.idCondominio}} className="btn btn-default">Adicionar Endereço</Link>}
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