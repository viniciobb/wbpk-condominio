"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import Input from "../common/textInput";
import EnderecosPage from "../enderecos/enderecosPage";
import FacilitiesPage from "../facilities/facilitiesPage";


class CondominioForm extends React.Component{
        
    render(){
        return ( 
            <div className="container">
                <form>
                <h1 className="page-header">Formulário Condomínio</h1>
                    <Input 
                        label="Nome"
                        name="nome"
                        onChange={this.props.onChange}
                        value={this.props.condominio.nome}
                        error={this.props.errors.nomeCondominio}
                    />
                    <Input 
                        label="CNPJ"
                        name="cnpj"
                        onChange={this.props.onChange}
                        value={this.props.condominio.cnpj}
                        error={this.props.errors.cnpj}
                    />
                    <Input 
                        label="Quantidade de Apartamentos"
                        name="quantidadeApartamentos"
                        onChange={this.props.onChange}
                        value={this.props.condominio.quantidadeApartamentos}
                        error={this.props.errors.quantidadeApartamentos}
                    />
                    <Input 
                        label="Quantidade de Blocos"
                        name="quantidadeBlocos"
                        onChange={this.props.onChange}
                        value={this.props.condominio.quantidadeBlocos}
                        error={this.props.errors.quantidadeBlocos}
                    />
                    <Input 
                        label="Quantidade de Elevadores"
                        name="quantidadeElevadores"
                        onChange={this.props.onChange}
                        value={this.props.condominio.quantidadeElevadores}
                        error={this.props.errors.quantidadeElevadores}
                    />
                    <Input 
                        label="Quantidade de Vagas"
                        name="quantidadeVagas"
                        onChange={this.props.onChange}
                        value={this.props.condominio.quantidadeVagas}
                        error={this.props.errors.quantidadeVagas}
                    />

                    <EnderecosPage
                        idCondominio={this.props.condominio.id}
                        getEnderecos={this.props.getEnderecos}
                        qtdeEndereco={1}
                    />

                    <FacilitiesPage
                        idCondominio={this.props.condominio.id}
                        getFacilities={this.props.getFacilities}
                    />

                    <input type="submit" value="Save" onClick={this.props.onSave} className="btn btn-default"/>
                </form>               
            </div>    
        ); 
    }

};

CondominioForm.propTypes={
        condominio: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object
}

module.exports = CondominioForm;  