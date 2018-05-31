"use strict";
import React from 'react';
import CondominioActions from '../../actions/condominioActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toastr from 'toastr';

//
//var Router = require('react-router');
//var Link = Router.Link;
//var CondominioActions = require("../../actions/condominioActions");
//var Toastr = require("toastr");
class CondominioList extends React.Component {

    constructor(props) {
         super(props);
         this.afterDeleting = this.afterDeleting.bind(this);
         this.deleteCondominio = this.deleteCondominio.bind(this);
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
            console.log("Rendering createCondominioRow");
            console.dir(condominio);
            return (
                <tr key={condominio.id}>
                    <td><a href="#" onClick={this.deleteCondominio.bind(this, condominio.id)}>Delete</a></td>
                    <td>
                        <Link to={"condominio/"+condominio.id}>{
                            condominio.nome}
                        </Link>
                    </td>
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