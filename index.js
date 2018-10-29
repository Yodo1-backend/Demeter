'use strict';
const DemeterServerClass = require('./lib/demeterServer');
const DemeterClientClass = require('./lib/demeterClient');
module.exports.CreateAsServer = function(httpServer,logOutFunc){
    DemeterServerClass.Create(httpServer,logOutFunc);
};
module.exports.CreateAsClient = function(serverUrl,logOutFunc){
    DemeterClientClass.Create(serverUrl,logOutFunc);
};
module.exports.GetServer = function(){
    return DemeterServerClass.Get();
};
module.exports.GetClient = function(){
    return DemeterClientClass.Get();
};