'use strict';
const hproseClass = require("./hprose/hproseclient");
const ResponseStruct = require("./struct/responsestruct");
const UrlChecker = require("./utils/urlCheck");
/**
 * @authors yanfeng (yanfeng@yodo1.com)
 * @date    2018-10-27 20:47:50
 * @version V0.1.0
 */
class DemeterServer{
    constructor(){
        this.urls = null;
        this.clientImp = null;
    }
    setUrls(urls){
        this.urls = urls;
    }
    init(){
        this.clientImp = hproseClass.createTcpClient(this.urls);
    }
    InvokeService(name,args){
        if(Object.prototype.toString.call(args).toLowerCase() !== '[object array]' || !args.length)
            args = [args];
        if(this.clientImp){
            return this.clientImp.InvokeService(name,args);
        }
        else{
            return ResponseStruct.INIT_ERROR_CLIENT;
        }
    }
    InvokeServiceWithCallback(name,args,callback){
        if(Object.prototype.toString.call(args).toLowerCase() !== '[object array]' || !args.length)
            args = [args];
        if(this.clientImp){
            this.clientImp.InvokeServiceWithCallback(name,args,callback);
        }
        else{
            if(null != callback)
            {
                callback(ResponseStruct.INIT_ERROR_CLIENT);
            }
        }
    }
}
module.exports.CreateAsTcpClient = function(urls){
    var result = new PoseidonClient();
    var rightUrls = UrlChecker.CheckUrls(urls,"tcp://");
    
    result.setUrls(rightUrls);
    result.init();
    return result;
};