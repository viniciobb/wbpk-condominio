"use strict"
import Dispatcher from "../dispatcher/appDispatcher";
import ActionTypes from "../constants/actionTypes";
import { EventEmitter }  from "events";
import  assign from "object-assign";
var _ = require("lodash");
var CHANGE_EVENT = "change";

var _condominios = []; // outside the export module
var _condominio= {};
var _saved_state = false;

// take an empty object, take the emitEmitter.prototype and 
// add everything on the last object
var CondominioStore = assign({}, EventEmitter.prototype,{
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);        
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);        
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getAllCondominios: function(){
        
        return _condominios;        
    },

    getCondominioById: function(id){

        var condominio;

        if(_condominios){

            condominio = _.find(_condominios, {id : id});
        }
        
        return condominio;
    },

    getStateCondominio: function(){

        if(_saved_state){

            return _condominio;

        }else{
            return false;            
        }
    },
   
    
    getEnderecosCondominio: function(condominioId){
        
        if(_condominios){

             var condominio = _.find(_condominios, {id : condominioId});
             
             return condominio.enderecos;

        }else{

            return;

        }
                    
    },

    getFacilitiesCondominio: function(condominioId){
        
        if(_condominios){

             var condominio = _.find(_condominios, {id : condominioId});
             
             return condominio.facilities;

        }else{

            return;

        }
                    
    }
    


});

CondominioStore.dispatchToken = Dispatcher.register(function(action){
    
    if(!action.actionType) return;
    
    switch(action.actionType){
        // this is the part that varies...
        
        case  ActionTypes.INITIALIZE_CONDOMINIO:
            
            if(action.initialData && action.initialData.condominios)
                _condominios = action.initialData.condominios;
            CondominioStore.emitChange();
            break;
        
        case ActionTypes.CREATE_CONDOMINIO:
            _condominios.push(action.condominio);
            _condominio = {};
            _saved_state = false;
            CondominioStore.emitChange();
        break;

        case ActionTypes.CLICK_CONDOMINIO:
            _condominio = action.condominio;
            console.dir(_condominio);
            _saved_state = true;
            CondominioStore.emitChange();
        break;

        case ActionTypes.CLICK_NEW_CONDOMINIO:
            _condominio = {
                    nome: '',
                    cnpj: 0,
                    quantidadeApartamentos: 0,
                    quantidadeBlocos: 0,
                    quantidadeElevadores: 0,
                    quantidadeVagas: 0,
                    id: 0,
                    enderecos: [],
                    facilities: []
            };
            _saved_state = true;
            CondominioStore.emitChange();
        break;

        case ActionTypes.UPDATE_CONDOMINIO:
            var existingCondominio = _.find(_condominios, {id : action.condominio.id});
            var existingCondominioIndex = _.indexOf(_condominios, existingCondominio);
            _condominio = {};
            _saved_state = false;
            _condominios.splice(existingCondominioIndex,1,action.condominio);
            CondominioStore.emitChange();
            break;

        case ActionTypes.DELETE_CONDOMINIO:
            var existingCondominio = _.find(_condominios, {id : action.id});
            var existingCondominioIndex = _.indexOf(_condominios, existingCondominio);
            _condominios.splice(existingCondominioIndex,1);
            CondominioStore.emitChange();
            break;

        case ActionTypes.SAVE_STATE_CONDOMINIO:
            _condominio = action.condominio;
            _saved_state = true;
            CondominioStore.emitChange();
            break;        

          
    }
});

module.exports = CondominioStore;