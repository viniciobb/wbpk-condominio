"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var CondominioApi = require("../api/condominioApi");
var actionTypes = require("../constants/actionTypes");

var CondominioActions = {
    
    getAllCondominios: function(){
    
        CondominioApi.getAllCondominios().then(function(responseCondominios){
            
            Dispatcher.dispatch({
                actionType: actionTypes.INITIALIZE_CONDOMINIO,
                initialData : {
                    condominios: responseCondominios
                }
            });

        });
    },    

    createCondominio: function(condominio, callback){
       
        CondominioApi.saveCondominio(condominio).then(function(newCondominio){

            Dispatcher.dispatch({
                actionType: actionTypes.CREATE_CONDOMINIO,
                condominio: newCondominio
            });

            callback();

        });
    },

    clickCondominio: function(_condominio){

            Dispatcher.dispatch({
                actionType: actionTypes.CLICK_CONDOMINIO,
                condominio: _condominio
            });
    },

    clickNewCondominio: function(){

        Dispatcher.dispatch({
            actionType: actionTypes.CLICK_NEW_CONDOMINIO
        });
        
    },
 
    //SAVE_STATE_CONDOMINIO: null,
    //GET_STATE_CONDOMINIO: null,    

    saveStateCondominio: function(condominio){
        //CondominioApi.updateCondominio(condominio).then(function(updatedCondominio){
            Dispatcher.dispatch({
                actionType: actionTypes.SAVE_STATE_CONDOMINIO,
                condominio: condominio
            });

        //});
        
    },

    updateCondominio: function(condominio, callback){
        CondominioApi.updateCondominio(condominio).then(function(updatedCondominio){
            Dispatcher.dispatch({
                actionType: actionTypes.UPDATE_CONDOMINIO,
                condominio: updatedCondominio
            });

            callback();

        });
        
    },

    deleteCondominio: function(id, callback){
        
        CondominioApi.deleteCondominio(id).then(function(response){
            Dispatcher.dispatch({
                actionType: actionTypes.DELETE_CONDOMINIO,
                id: response.id
            });

            callback();
        });
        
    }

    

};

module.exports = CondominioActions;