"use strict";
import React from 'react';
import CondominioStore from '../../stores/condominioStore';
import CondominioActions from '../../actions/condominioActions';
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
        this._onClick = this._onClick.bind(this);
    }

    _onClick(){
        event.preventDefault();
        CondominioActions.clickNewCondominio();
        console.dir(this.props.history);
        this.props.history.push("/condominio");
    }

    componentDidMount(){

        console.log("CondominiosPage componentDidMount");
        
        //this.setState({
        CondominioActions.getAllCondominios();
        //});

    }
    
     componentWillMount (){
         CondominioStore.addChangeListener(this._onChange);
    }
    
    componentWillUnmount (){
         CondominioStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
        
        console.log("on_change CondominiosPage")

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
               <div><a href="#" onClick={this._onClick.bind(this)}>Adicionar Condomínio</a></div>
               {/* <Link to="/condominio" className="btn btn-default">Adicionar Condomínio</Link> */}
               <CondominioList 
                    condominios={this.state.condominios}
                    history={this.props.history}
                    />

            </div>    
        );
    }
};

module.exports = CondominiosPage;