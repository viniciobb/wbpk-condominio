"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import Input from "../common/textInput";
import BuscaCep from "../common/buscaCep";

class EnderecoForm extends React.Component{

    render(){
        return (
           
           <form className="container">
                
                <h1 className="page-header">Formulário Endereço</h1>   
                
                <BuscaCep 
                    onBusca={this.props.onBusca}
                    errors={this.props.errors}
                    onChange={this.props.onChange}
                    label="CEP"
                    name="cep"
                    onChange={this.props.onChange}
                    value={this.props.endereco.cep}
                    error={this.props.errors.cep}
                />

                <Input 
                    label="Logradouro"
                    name="logradouro"
                    onChange={this.props.onChange}
                    value={this.props.endereco.logradouro}
                    error={this.props.errors.logradouro}
                />
                
                <Input 
                    label="Número"
                    name="numero"
                    onChange={this.props.onChange}
                    value={this.props.endereco.numero}
                    error={this.props.errors.numero}
                />
                <Input 
                    label="Bairro"
                    name="bairro"
                    onChange={this.props.onChange}
                    value={this.props.endereco.bairro}
                    error={this.props.errors.bairro}
                />
                <Input 
                    label="Complemento"
                    name="complemento"
                    onChange={this.props.onChange}
                    value={this.props.endereco.complemento}
                    error={this.props.errors.complemento}
                />
                 <Input 
                    label="Cidade"
                    name="cidade"
                    onChange={this.props.onChange}
                    value={this.props.endereco.cidade}
                    error={this.props.errors.cidade}
                />

                <Input 
                    label="Estado"
                    name="estado"
                    onChange={this.props.onChange}
                    value={this.props.endereco.estado}
                    error={this.props.errors.estado}
                />

                <input type="submit" value="Save" onClick={this.props.onSave} classNameName="btn btn-primary mb-2"/>
            </form>
           
            
        ); 
    }

};

EnderecoForm.propTypes= {
    endereco: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBusca: PropTypes.func.isRequired,
    errors: PropTypes.object
}

module.exports = EnderecoForm;  