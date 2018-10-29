'use strict';
const ioClass = require('socket.io');
/**
 * @authors yanfeng (yanfeng@yodo1.com)
 * @date    2018-10-27 20:47:50
 * @version V0.1.0
 */
class DemeterServer{
    constructor(){
        this.io = null;
        this.logout = null;
    }
    init(httpServer,logOutFunc){
        this.io = ioClass(httpServer);
        if(logOutFunc && typeof logOutFunc == 'function'){
            this.logout = logOutFunc;
        }else{
            this.logout = (logStr)=>{console.log(logStr)};
        }
        this.io.on('connection', (socket) => {
            this.logout("连接成功!");
        });
    }
}
const _instanceHolder = null;
module.exports.Create = function(httpServer,logOutFunc){
    var result = new DemeterServer();
    result.init(httpServer,logOutFunc);
    _instanceHolder = result;
};
module.exports.Get = function(){
    return _instanceHolder;
};