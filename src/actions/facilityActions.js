"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var CondominioApi = require("../api/condominioApi");
var actionTypes = require("../constants/actionTypes");
var Toastr = require("toastr");

var FacilityActions = {
    

    createFacility: function(facility){

        Dispatcher.dispatch({
            actionType: actionTypes.CREATE_FACILITY,
            facility: facility
        });
    },

    cleanFacility: function(){
        Dispatcher.dispatch({
            actionType: actionTypes.CLEAN_FACILITY
        });
    },

    updateFacility: function(facility, index){
        Dispatcher.dispatch({
            actionType: actionTypes.UPDATE_FACILITY,
            facility: facility,
            index : index
        });
    },

    deleteFacility: function(facility){
        Dispatcher.dispatch({
            actionType: actionTypes.DELETE_FACILITY,
            facility: facility
        });
    },

    carregaFacilities: function(facilities){
        Dispatcher.dispatch({
            actionType: actionTypes.INIT_FACILITY,
            facilities: facilities
        });
    }
  

};

module.exports = FacilityActions;