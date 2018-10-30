'use strict';
const ioClass = require('socket.io');
/**
 * @authors yanfeng (yanfeng@yodo1.com)
 * @date    2018-10-27 20:47:50
 * @version V0.1.0
 */
const MSG_NAME_WATCHPOINT_WATCH = 'innerWatchPointWatchMsg';
const MSG_NAME_WATCHPOINT_INVOKE = 'innerWatchPointInvokeMsg';
class DemeterServer{
    constructor(){
        this.io = null;
        this.logout = null;
        this.watchPointMapping = [];
    }
    init(httpServer,logOutFunc){
        this.io = ioClass(httpServer);
        //if(logOutFunc && typeof logOutFunc == 'function'){
         //   this.logout = logOutFunc;
        //}else{
            this.logout = function(logStr){console.log(logStr)};
        //}
        let _this = this;
        this.io.on('connection', function (socket) {
            _this.logout('Someone connected');
            socket.emit('news', { hello: 'world' });
            socket.on('test', function (data) {
                _this.logout(data);
                var name = data.name;
                var content = data.content;
                socket.emit('responMsg', { res: 'Hello,'+ name +',I hear u say that {'+content+'}!' });
            });
            socket.on(MSG_NAME_WATCHPOINT_WATCH,function(data){
                setInterval(()=>{
                    socket.emit(MSG_NAME_WATCHPOINT_INVOKE,{time:Date.now()})
                },1000)
            });
        });

    }
}
let _instanceHolder = null;
module.exports.Create = function(httpServer,logOutFunc){
    var result = new DemeterServer();
    result.init(httpServer,logOutFunc);
    _instanceHolder = result;
};
module.exports.Get = function(){
    return _instanceHolder;
};