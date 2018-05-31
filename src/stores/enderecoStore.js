"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var ParentTypes = require("../constants/parentTypes");
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
        
        console.dir(_endereco);
        return _endereco;
    },

    getSavedState: function(){
        
        return _saved_state;
    },

    getEnderecoById: function(id){

        console.log(id);
        console.dir(_enderecos);
        var endereco = _.find(_enderecos, {_id : id});
        console.dir(endereco);     
        return endereco;
    },

    getInitialized: function(){
        
        return _initialized;
    }

});

Dispatcher.register(function(action){
    
    console.dir(action);

    if(!action.actionType) return;
    
    console.dir(action.enderecos);

    switch(action.actionType){
        // this is the part that varies...

        
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
            console.log(typeof(_enderecos));
            console.dir(_enderecos);
            _enderecos.push(action.endereco);
            console.log("_enderecos in endereco Store");
            console.dir(_enderecos);
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
            console.dir(_endereco);
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