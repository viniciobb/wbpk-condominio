"use strict";
import React from 'react';
import CondominioStore from '../../stores/condominioStore';
//var Link = require('react-router').Link;
import CondominioList from './condominioList';

class CondominiosPage extends React.Component {
    
    // getInitialState: function(){
    //     return {
    //         condominios: CondominioStore.getAllCondominios()
    //     };
    // },
    
    // componentWillMount : function(){
    //     CondominioStore.addChangeListener(this._onChange);
    // },
    // componentWillUnmount : function(){
    //     CondominioStore.removeChangeListener(this._onChange);
    // },
    
    // _onChange : function(){
    //     console.log("onChange condominioPage");
    //     this.setState({ condominios: CondominioStore.getAllCondominios() });
    // },
    
    render(){
        
        return (
            <div className="container">
               <h1 className="page-header">Condomínios</h1>
               <Link to="addCondominio" className="btn btn-default">Adicionar Condomínio</Link>
               <CondominioList 
                    condominios={this.state.condominios}/>   
            </div>    
        );
    }
};

module.exports = CondominiosPage;