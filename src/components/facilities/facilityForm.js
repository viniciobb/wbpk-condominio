"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Input = require("../common/textInput");
var DropDown = require("../common/dropDown");
var RadioButton = require("../common/radio");
var TextAreaInput = require("../common/textAreaInput");
var FacilityForm = createReactClass({
    
    propTypes: {
        facility: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
        
    render: function(){
        return (
           
           <form className="container">
                
                <h1 className="page-header">Formulário Facility</h1>   
             

                <Input 
                    label="Nome"
                    name="nomefacility"
                    onChange={this.props.onChange}
                    value={this.props.facility.nomefacility}
                    error={this.props.errors.nomefacility}
                />
                
                <Input
                    label="Tempo de Reserva"
                    name="tempoReserva"
                    onChange={this.props.onChange}
                    value={this.props.facility.tempoReserva}
                    error={this.props.errors.tempoReserva}
                />

                <RadioButton
                    label="Tempo de Reserva"
                    name="tempoReserva"
                    onChange={this.props.onChange}
                    value={this.props.facility.tempoReserva}
                    error={this.props.errors.tempoReserva}
                />
                
                <Input 
                    label="Disponibilidade Dia"
                    name="disponibilidadeDia"
                    onChange={this.props.onChange}
                    value={this.props.facility.disponibilidadeDia}
                    error={this.props.errors.disponibilidadeDia}
                />

                <Input 
                    label="Disponibilidade Hora"
                    name="disponibilidadeHora"
                    onChange={this.props.onChange}
                    value={this.props.facility.disponibilidadeHora}
                    error={this.props.errors.disponibilidadeHora}
                />

                <Input 
                    label="Valor"
                    name="valor"
                    onChange={this.props.onChange}
                    value={this.props.facility.valor}
                    error={this.props.errors.valor}
                />

                <TextAreaInput 
                    label="Regras de Uso"
                    name="regrasUso"
                    onChange={this.props.onChange}
                    value={this.props.facility.regrasUso}
                    error={this.props.errors.regrasUso}
                    rows={3}
                />

                <input type="submit" value="Save" onClick={this.props.onSave} classNameName="btn btn-primary mb-2"/>
            </form>
           
            
        ); 
    }

});

module.exports = FacilityForm;  