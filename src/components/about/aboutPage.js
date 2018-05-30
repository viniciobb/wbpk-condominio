"use strict";
import React from 'react';
import DropDown from "../common/dropDown";

class About extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
             lista: [

            //     {
            //         nome : "jose",
            //         idade : 20

            //     },
            //     {
            //         nome : "joao",
            //         idade : 30

            //     },
            //     {
            //         nome : "jacu",
            //         idade : 35

            //     }


            ]

        };
        
    }
    
    render(){

        var createEnderecoRow = function(endereco, index){
            
            return (
                
                <tr>
                    <td>{index}</td>
                    <td>{endereco.nome}</td>
                    <td>{endereco.idade}</td>
                </tr>
            );
        };
        
        
        return (

            <div>
                <table className="table">
                <thead>
                    <th>Delete</th>
                    <th>Logradouro</th>
                    <th>Numero</th>
                    <th>Bairro</th>
                    <th>CEP</th>
                </thead>    
                <tbody>
                    {this.state.lista.map(createEnderecoRow, this)}
                </tbody>
                </table>    
            </div>  

        );
    }

};

module.exports = About; 