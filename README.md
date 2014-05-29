NodeGBKString
=============

nodeJS 解决读取编码为GBK字符串的问题

在请求http://api.go2map.com/engine/api/ipcity/json 地址的时候返回的是GBK编码的字符串、由于NodeJS对中文编码支持的问题，所以需要使用第三方的模块来解决，这里需要*bufferhelper*、*iconv-lite*来解决。

		var http = require('http');
		var fs = require('fs');
		var iconv = require('iconv-lite');
		var BufferHelper = require('bufferhelper');
		var url = "http://api.go2map.com/engine/api/ipcity/json"
		    //var html='';
		    var req = http.get(url,function(res){
		       // res.setEncoding('binary');
		        var buffer = new BufferHelper();
		        res.on('data',function(data){
		            buffer.concat(data);
		        }).on('end',function(){
		            var buf = buffer.toBuffer();
		            //var buf = new Buffer(html,'binary');
		            var str = iconv.decode(buf,'GBK');//设置编码 ，这个编码根据实际情况。
		            console.log(str);
		        }).on('close',function(){
		            console.log('Close recevied!');
		        });
		    });
		    req.on('error',function(error){
		        fs.appendFile('error.log',new Date().getTime()+' '
		            +error+'\r\n','utf-8');
		    });
