/**
 * Created by kunkun on 13-12-31.
 */



var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var url = "http://api.go2map.com/engine/api/ipcity/json"
function getFromURL(){
    var html='';
    var req = http.get(url,function(res){
       // res.setEncoding('binary');
        var buffer = new BufferHelper();
        res.on('data',function(data){
            buffer.concat(data);
        }).on('end',function(){
            var buf = buffer.toBuffer();
            //var buf = new Buffer(html,'binary');
            var str = iconv.decode(buf,'GBK');
            console.log(str);
        }).on('close',function(){
            console.log('Close recevied!');
        });
    });
    req.on('error',function(error){
        fs.appendFile('error.log',new Date().getTime()+' '
            +error+'\r\n','utf-8');
    });
};

getFromURL()