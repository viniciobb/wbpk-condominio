import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EnderecoStore from "../../stores/enderecoStore";
import EnderecoActions from "../../actions/enderecoActions";
import Toastr from "toastr";

class EnderecoList extends React.Component{

     constructor(props) {
         super(props);

         console.log("EnderecoList constructor");

       //this.state = {
         //  enderecos: this.props.enderecos
       //};

       this.deleteEndereco =  this.deleteEndereco.bind(this);

     }

    deleteEndereco(endereco, event){ 
        event.preventDefault();
        EnderecoActions.deleteEndereco(endereco);
        Toastr.success("Endereco Deleted" + endereco.logradouro);
    }

    render(){

        var createEnderecoRow = function(endereco, index){

            
            return (
                
                <tr>
                    <td><a href="#" onClick={this.deleteEndereco.bind(this, endereco)}>Delete</a></td>
                    <td><Link to={"/condominio/" + this.props.idCondominio +"/endereco/" + index }>{endereco.logradouro}</Link></td>
                    <td>{endereco.numero}</td>
                    <td>{endereco.bairro}</td>
                    <td>{endereco.cep}</td>
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
                    {this.props.enderecos.map(createEnderecoRow, this)}
                </tbody>
                </table>    
            </div>    
        );
    }
};

EnderecoList.propTypes= {
    enderecos: PropTypes.array.isRequired
};


module.exports = EnderecoList;