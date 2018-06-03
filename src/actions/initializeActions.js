"use strict"
var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
//var AuthorApi = require("../api/authorApi");
var CondominioApi = require("../api/condominioApi");


var InitializeActions = {
    initApp: function(){

        CondominioApi.getAllCondominios().then(function(responseCondominios){
            
            Dispatcher.dispatch({
                actionType: ActionTypes.INITIALIZE_CONDOMINIO,
                initialData : {
                    condominios: responseCondominios
                }
            });

        });
        
    }
}

module.exports = InitializeActions;