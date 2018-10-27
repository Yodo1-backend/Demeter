'use strict';
const PoseidonClientClass = require("./lib/demeterServer");
module.exports.CreateAsServer = function(urls){
    var result = PoseidonClientClass.CreateAsTcpClient(urls);
    return result;
};