"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");
var CHANGE_EVENT = "change";

var _enderecos = []; // outside the export module
var _initialized = false;
var _endereco = {};
var _saved_state = false;

// take an empty object, take the emitEmitter.prototype and 
// add everything on the last object
var EnderecoStore = assign({}, EventEmitter.prototype,{
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);        
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);        
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    
    getEnderecos: function(){
        
        return _enderecos;
    },

    getEndereco: function(){
        
        return _endereco;
    },

    getSavedState: function(){
        
        return _saved_state;
    },

    getEnderecoById: function(id){

        var endereco = _.find(_enderecos, {_id : id});
        return endereco;
    },

    getEnderecoByIndex: function(index){
        
        return _enderecos[index];
        
    },

    getInitialized: function(){
        
        return _initialized;
    }

});

Dispatcher.register(function(action){

    if(!action.actionType) return;

    switch(action.actionType){
        
        case ActionTypes.CLICK_CONDOMINIO:
            console.log("CLICK_CONDOMINIO");
            console.dir(action.condominio);
            _enderecos = action.condominio.enderecos;
            _endereco = {};
            //_initialized = true;
            //_saved_state = true;
            
        break;

        case ActionTypes.CLICK_NEW_CONDOMINIO:
            console.log("_NEW_CONDOMINIO");
            _enderecos = [];
            _endereco = {};
            _initialized = false;
            _saved_state = false;

        break;

        case ActionTypes.CLEAN_ENDERECO:
            console.dir(_endereco);
            _enderecos = [];
            _initialized = false;
            _endereco = {};
            _saved_state = false;
            EnderecoStore.emitChange();
            console.log("erase CLEAN _ENDERECO");
        break;
        
        case ActionTypes.INIT_ENDERECO:
            if(action.enderecos.length > 0 )
                _enderecos = action.enderecos;

            _initialized = true;
            _endereco = {};
            _saved_state = false;
            EnderecoStore.emitChange();
            break;
        
        case ActionTypes.CREATE_ENDERECO:
            _enderecos.push(action.endereco);
            _endereco = {};
            _saved_state = true;
            EnderecoStore.emitChange();
        break;

        case ActionTypes.BUSCA_ENDERECO:

            var enderecoModel = {
                logradouro: action.endereco.logradouro, 
                siglaFederacao: action.endereco.estado,
                cep: action.endereco.cep,
                bairro: action.endereco.bairro,
                cidade: action.endereco.cidade,
                estado: action.endereco.estado_info.nome,
                numero: 0,
                complemento : ""
            };
            
            _endereco = enderecoModel;
            _saved_state = true;
            EnderecoStore.emitChange();
            break;  

        case ActionTypes.UPDATE_ENDERECO:
            _enderecos[action.index] = action.endereco;
            _endereco = {};
            _saved_state = true;    
            EnderecoStore.emitChange();
        break;
        
        case ActionTypes.DELETE_ENDERECO:
            //_enderecos.push(action.endereco);
            var find = false;
            if(action.endereco.id){
                var existingEndereco = _.find(_enderecos, {id : action.endereco.id});
                var existingEnderecoIndex = _.indexOf(_enderecos, existingEndereco);
                _enderecos.splice(existingEnderecoIndex,1);
                var find = true;
            }else{
                var existingEndereco = _.find(_enderecos, {logradouro : action.endereco.logradouro, 
                                                           numero: action.endereco.numero});
                var existingEnderecoIndex = _.indexOf(_enderecos, existingEndereco);                                           
                _enderecos.splice(existingEnderecoIndex,1);    
                var find = true;

            }
        if(find == true){
            console.log("found");
        }    

        EnderecoStore.emitChange();
        break;
            
            
    }
});

module.exports = EnderecoStore;