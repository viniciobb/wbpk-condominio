"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import Input from "../common/textInput";
import DropDown from "../common/dropDown";
import RadioButton from "../common/radio";
import TextAreaInput from "../common/textAreaInput";
import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
const Range = Slider.Range;

class FacilityForm extends React.Component {    
        
    render(){
        return (
           
           <form className="container">
                
                <h1 className="page-header">Formulário Facility</h1>

                <Slider min={0} max={20} defaultValue={3}/>
                <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />

                <Input 
                    label="Nome"
                    name="nomefacility"
                    onChange={this.props.onChange}
                    value={this.props.facility.nomefacility}
                    error={this.props.errors.nomefacility}
                />
                
                
                <RadioButton
                    label="Intervalo de Reserva"
                    name="tipoIntervaloReserva"
                    onChange={this.props.onChange}
                    checked={this.props.facility.tipoIntervaloReserva}
                    value={this.props.intervaloReserva}
                    error={this.props.errors.intervaloReserva}
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

};

FacilityForm.propTypes={
    facility: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
}

module.exports = FacilityForm;  