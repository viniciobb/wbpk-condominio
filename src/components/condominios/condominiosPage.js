"use strict";
import React from 'react';
import CondominioStore from '../../stores/condominioStore';
import { Link } from 'react-router-dom';
import CondominioList from './condominioList';

class CondominiosPage extends React.Component {

    constructor(props) {
        super(props);
        
        console.log("CondominiosPage constructor");

        this.state = {
            condominios: []
        };
        // this.setState({
        //     condominios: CondominioStore.getAllCondominios()
        // });

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(){

        console.log("CondominiosPage componentDidMount");
        
        this.setState({
            condominios: CondominioStore.getAllCondominios()
        });

    }
    
    componentWillMount (){
        CondominioStore.addChangeListener(this._onChange);
    }
    
    componentWillUnmount (){
        CondominioStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
         
         this.setState(function(prevState, props){
            return {
                condominios:  CondominioStore.getAllCondominios() 
            };            
         });
    }

    render(){
        
        return (
            <div className="container">
               <h1 className="page-header">Condomínios</h1>
               <Link to="/addCondominio" className="btn btn-default">Adicionar Condomínio</Link>
               <CondominioList 
                    condominios={this.state.condominios}/>    
            </div>    
        );
    }
};

module.exports = CondominiosPage;