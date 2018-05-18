"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var Link = require('react-router').Link;
var FacilitiesList = require("./facilitiesList");
var FacilityStore = require("../../stores/facilityStore");
var FacilityActions = require("../../actions/facilityActions");


var FacilitiesPage = createReactClass({

     propTypes: {
         getFacilities: React.PropTypes.func.isRequired
     },

    statics: {

        willTransitionFrom: function(transition, component){
            // if( component.state.dirty && !confirm("Leave without saving ?")){
            //     transition.abort();
            // }    
        }

    },
    
    getInitialState: function(){

        var facilities = [];

        console.log(this.props.idCondominio); 

        

        if(this.props.idCondominio){
            
            if(!FacilityStore.getInitialized()){
                facilities = this.props.getFacilities(); 
                FacilityActions.carregaFacilities(facilities);

            }else{
                facilities = FacilityStore.getFacilities();
            }

        }else{
           

            if(FacilityStore.getSavedState()){

                facilities = FacilityStore.getFacilities();

            }else{

                FacilityActions.cleanFacility();

            }


        }

        console.log("facilities in facility page");
        console.dir(facilities);

        return {
            facilities
        };
    },
    
    componentWillMount : function(){
        FacilityStore.addChangeListener(this._onChange);
    },
    componentWillUnmount : function(){
        FacilityStore.removeChangeListener(this._onChange);
    },
    
    _onChange : function(){
        console.log("onChange facilityPage");
        this.setState({ facilities: FacilityStore.getFacilities()});
    },
    
    // qtdeEnderecos : function(){
        
    //     var labelEndereco = "Endereços"
    //     if(this.props.qtdeEndereco == 1){
    //         labelEndereco = "Endereço"
    //     }
    //     return labelEndereco;

    // },

    // showAddFacility : function(){
        
    //     var showAddEnderecos = true; 
    //     console.log("showAddEnderecos");
    //     console.log(this.state.enderecos.length);
    //     console.log(this.props.qtdeEndereco);
    //     if(this.state.enderecos.length >= this.props.qtdeEndereco){
    //         showAddEnderecos = false;
    //     }

    //     return showAddEnderecos;
    // },

    render: function(){
        
        return (
            <div className="container">
               <h1 className="page-header">Facilities Page</h1>
               <Link to="addFacility" params={{idCondominio: this.props.idCondominio}} className="btn btn-default">Adicionar Facility</Link>
               <FacilitiesList 
                    facilities={this.state.facilities}
                    idCondominio={this.props.idCondominio}
                />   
            </div>    
        );
    }
});

module.exports = FacilitiesPage;