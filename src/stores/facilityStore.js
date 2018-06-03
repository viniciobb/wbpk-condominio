"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var CondominioStore = require("./condominioStore");
// apagar ?? var ParentTypes = require("../constants/parentTypes");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");
var CHANGE_EVENT = "change";

var _facilities = []; // outside the export module
var _initialized = false;
var _facility = {};
var _saved_state = false;
var _index=0;

// take an empty object, take the emitEmitter.prototype and 
// add everything on the last object
var FacilityStore = assign({}, EventEmitter.prototype,{
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);        
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);        
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    
    getFacilities: function(){
        
        return _facilities;
    },

    getFacility: function(){
        
        return _facility;
    },

    getFacilityById: function(id){
        
        return _facilities[id];
    },

    getSavedState: function(id){
        
        return _saved_state;
    },

    getInitialized: function(){
        
        
        return _initialized;
    }

    

});

Dispatcher.register(function(action){
    
    
    if(!action.actionType) return;
    
    switch(action.actionType){
        // this is the part that varies...

        
        case ActionTypes.CLEAN_FACILITY:
            _facilities = [];
            _initialized = false;
            _facility = {};
            _saved_state = false;
            FacilityStore.emitChange();
            break;

        case ActionTypes.CLICK_CONDOMINIO:
            Dispatcher.waitFor([CondominioStore.dispatchToken]);
            console.log("CLICK_CONDOMINIO");
            console.dir(action.condominio);
            _facilities = action.condominio.facilities;
            _facility = {};
            FacilityStore.emitChange();
        break;
        
        case ActionTypes.CLICK_NEW_CONDOMINIO:
            console.log("_NEW_CONDOMINIO");
            _facilities = [];
            _facility = {};
            FacilityStore.emitChange();
        break;

        case ActionTypes.CLICK_NEW_FACILITY:
            console.log("CLICK_NEW_FACILITY");
            _facility = {
                nomefacility: '',
                tempoReserva: '',
                disponibilidadeDia: '',
                disponibilidadeHora: '',
                valor: 0,
                regrasUso: '',
                id: ''
            };
            _index=0;
            _saved_state = false;
            FacilityStore.emitChange();
        break;
   
        case ActionTypes.CLICK_FACILITY:
            _facility = action.facility;
            _index = action.index;
            _saved_state = true;    
            FacilityStore.emitChange();
        break;
        
        case ActionTypes.INIT_FACILITY:
            _facilities = action.facilities;
            _initialized = true;
            _facility = {};
            _saved_state = false;
            FacilityStore.emitChange();
            break;
        
        case ActionTypes.CREATE_FACILITY:
            _facilities.push(action.facility);
            
            //_initialized = true;
            _facility = {};
            _saved_state = true;
            FacilityStore.emitChange();
        break;

        case ActionTypes.UPDATE_FACILITY:
            _facilities[action.index] = action.facility;
            _facility = {};
            _saved_state = true;    
            FacilityStore.emitChange();
        break;
        
        case ActionTypes.DELETE_FACILITY:
            var find = false;
            if(action.facility.id){
                var existingFacility = _.find(_facilities, {id : action.facility.id});
                var existingFacilityIndex = _.indexOf(_facilities, existingFacility);
                _facilities.splice(existingFacilityIndex,1);
                var find = true;
            }else{
                var existingFacility = _.find(_facilities, {nomefacility : action.facility.nomefacility, 
                                                            tempoReserva: action.facility.tempoReserva});
                var existingFacilityIndex = _.indexOf(_facilities, existingFacility);                                           
                _facilities.splice(existingFacilityIndex,1);    
                var find = true;

            }
        if(find == true){
            console.log("found");
        }    
        _saved_state = true;
        FacilityStore.emitChange();
        break;
            
            
    }
});

module.exports = FacilityStore;