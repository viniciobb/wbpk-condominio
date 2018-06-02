"use strict";
import React from 'react';
import CondominioActions from '../../actions/condominioActions';
import PropTypes from 'prop-types';
import Toastr from 'toastr';


class CondominioList extends React.Component {

    constructor(props) {
         super(props);
         this.afterDeleting = this.afterDeleting.bind(this);
         this.deleteCondominio = this.deleteCondominio.bind(this);
         this._onClick =  this._onClick.bind(this);
    }

    _onClick(condominio, event){
        event.preventDefault();
        CondominioActions.clickCondominio(condominio);
        this.props.history.push("condominio/"+condominio.id);
    }

    afterDeleting(){
        Toastr.success("Condominio Deleted");
        //this.props.history.push("/condominios");
    }
    

    deleteCondominio(id, event){
        event.preventDefault();
        CondominioActions.deleteCondominio(id, this.afterDeleting);
        
    }
    
    render(){
        
        var createCondominioRow = function(condominio){
            
            return (
                <tr key={condominio.id}>
                    <td><a href="#" onClick={this.deleteCondominio.bind(this,condominio.id)}>Delete</a></td>
                    <td><a href="#" onClick={this._onClick.bind(this,condominio)}>{condominio.nome}</a></td>
                    <td>{condominio.cnpj}</td>
                </tr>
            );
        };
        
        return (
            <div>
                <table className="table">
                <thead>
                    <th>Delete</th>
                    <th>Nome</th>
                    <th>CNPJ</th>
                </thead>    
                <tbody>
                    {this.props.condominios.map(createCondominioRow, this)}
                </tbody>
                </table>    
            </div>    
        );
    }
};

CondominioList.propTypes= {
    condominios: PropTypes.array.isRequired
}

module.exports = CondominioList;