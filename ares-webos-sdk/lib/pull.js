var fs=require("fs"),async=require("async"),npmlog=require("npmlog"),util=require("util"),luna=require("./luna"),path=require("path"),streamBuffers=require("stream-buffers"),os=require("os"),mkdirp=require("mkdirp"),fstream=require("fstream"),spawn=require("child_process").spawn,novacom=require("./novacom"),commonTools=require("./common-tools"),novacomUsb=require("./novacom-usb");
(function(){var q=npmlog;q.heading="pull";q.level="warn";var D={pull:function(h,l){function x(c,d){q.verbose("Pull","err: ",c,"result:",d);if(!c){y=(new Date).getTime();var a=(y-z)/1E3;console.log(m+" file(s) pulled");console.log(Math.round(k/(1024*a))+" KB/s ("+k+" bytes in "+a+"s)")}return setImmediate(l,c,d)}if("function"!==typeof l)throw Error("Missing completion callback (next="+util.inspect(l)+")");var n,m=0,k=0,z=(new Date).getTime(),y=(new Date).getTime(),b=h.sourcePath,a=h.destinationPath,
t=!1,r=novacomUsb.getNovacomPath(),A=new streamBuffers.WritableStreamBuffer,B=new streamBuffers.WritableStreamBuffer,C=new streamBuffers.WritableStreamBuffer,u=new streamBuffers.WritableStreamBuffer,v=[];commonTools.appdata.compareProfile("watch",function(a,d){t=d});String.prototype.replaceAll=function(a,d,b){var c=this+"",e=-1;if("string"===typeof a)if(b)for(a.toLowerCase();-1!==(e=c.toLowerCase().indexOf(a,0<=e?e+d.length:0));)c=c.substring(0,e)+d+c.substring(e+a.length);else return this.split(a).join(d);
return c};async.waterfall([function(a){var d=new novacom.Resolver;async.waterfall([d.load.bind(d)],function(){var c=d.devices,b;for(b in c)if(c[b].name==h.device){n=c[b].id;break}setImmediate(a)})},function(a){new novacom.Session(h.device,a)},function(c,d){q.info("pull#transferFiles():","sourcePath "+b,"destinationPath "+a);try{var l=b,w=b.length;b=b.replaceAll(" ","\\ ");var e="[ -f "+b+" ] && echo 'f' || echo 'nf'";c.run(e,null,A,null,function(){console.log("Copying data ....");z=(new Date).getTime();
if("f\n"==A.getContentsAsString()){var f;fs.exists(a,function(e){e&&(stats=fs.lstatSync(a),stats.isDirectory()&&(a=a+path.sep+path.basename(l)));if(t){f=n?spawn(r,["get","file://"+b,"-d",n]):spawn(r,["get","file://"+b]);m++;var p=fs.createWriteStream(a,{encoding:"binary"});f.stdout.on("data",function(a){p.write(a)});f.stdin.end();f.stderr.on("data",function(a){setImmediate(d,a)});f.on("exit",function(c){p.end();a=a.replaceAll("\\\\","\\");a=a.replaceAll("//","/");h.ignore||console.log("Pull: "+b+
" -> "+a);stat=fs.lstatSync(a);k+=stat.size;setImmediate(d)})}else c.get(b,a,function(c){if(c)return setImmediate(d,c);h.ignore||console.log("Pull: "+b+" -> "+a);stat=fs.lstatSync(a);m++;k+=stat.size;setImmediate(d)})})}else e="[ -d "+b+" ] && echo 'd' || echo 'nd'",c.run(e,null,B,null,function(){if("d\n"==B.getContentsAsString())fs.existsSync(a)||fs.mkdirSync(a),async.waterfall([function(d){e="find "+b+" -type d -follow -print";c.run(e,null,C,null,function(){var c=C.getContentsAsString().split("\n");
async.eachSeries(c,function(c,d){var b=path.join(a,c.substring(w));mkdirp(b,function(a){setImmediate(d)})},function(a){setImmediate(d,a)})})},function(d){e="find "+b+" -type f -follow -print";c.run(e,null,u,null,function(){if(0==u.size())return setImmediate(d);v=u.getContentsAsString().split("\n");v.pop();async.eachSeries(v,function(b,e){if(t){var f;f=n?spawn(r,["get","file://"+b.replaceAll(" ","\\ "),"-d",n]):spawn(r,["get","file://"+b.replaceAll(" ","\\ ")]);m++;var g=path.join(a,b.substring(w)),
p=fs.createWriteStream(g,{encoding:"binary"});f.stdout.on("data",function(a){p.write(a)});f.stdin.end();f.stderr.on("data",function(a){setImmediate(d,a)});f.on("exit",function(a){p.end();g=g.replaceAll("\\\\","\\");g=g.replaceAll("//","/");h.ignore||console.log("Pull: "+b+" -> "+g);stat=fs.lstatSync(g);k+=stat.size;setImmediate(e)})}else{var g=path.join(a,b.substring(w));c.get(b.replaceAll(" ","\\ "),g,function(a){if(a)return setImmediate(d,a);h.ignore||console.log("Pull: "+b+" -> "+g);m++;stat=fs.lstatSync(g);
k+=stat.size;setImmediate(e)})}},function(a){setImmediate(d,a)})})}],function(a,c){setImmediate(d,a,c)});else return setImmediate(d,Error("Source does not exist."))})})}catch(f){1==f.code&&(f=Error("Wrong path: "+f)),x(f)}}],function(a,b){x(a,b)})}};"undefined"!==typeof module&&module.exports&&(module.exports=D)})();