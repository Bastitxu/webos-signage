var fs=require("fs"),async=require("async"),log=require("npmlog"),util=require("util"),path=require("path"),streamBuffers=require("stream-buffers"),novacom=require("./novacom");
(function(){function p(){this.sources=[];this.destination=null}function q(d,a,b,c,e,l){log.verbose("copyFilesToNewDir()","src:",a,", dst:",b);var g=this;async.waterfall([fs.lstat.bind(fs,a),function(h,f){if(h.isDirectory()){log.verbose("copyFilesToNewDir()","src is a directory");c===k.FILE&&f(Error("The desination exists as a file."));b=path.join(b,path.basename(a)).replace(/\\/g,"/");var n=fs.readdirSync(a);async.forEach(n,function(h,c){var f=path.join(a,h);q.call(g,d,f,b,k.NEW,e,function(b){c(b)})},
function(b){f(b)})}else{var m;c===k.FILE?(m=b,b=path.join(b,"..")):m=path.join(b,path.basename(a)).replace(/\\/g,"/");r(d,b,function(c){log.verbose("copyFilesToNewDir()","mkDir#dst:",b,",err:",c);d.put(a,m,function(b){if(!b){var c=h.size;e.ignore||console.log("Push:",a,"->",m);g.copyfilesCount++;g.totalSize+=c}f(b)})})}}],function(b){l(b)})}function r(d,a,b){async.series([d.run.bind(d,"/bin/mkdir -p "+a,null,null,null)],function(a){a&&1==a.code&&(a=Error("Failed creation of directory due to permission error in the destination path"));
b(a)})}function t(d,a,b){var c=new streamBuffers.WritableStreamBuffer;a=util.format("[ -d %s ] && echo 'd' || ([ -f %s ] && echo 'f' || echo 'n')",a,a);d.run(a,null,c,null,function(a){var d=c.getContentsAsString().trim();log.verbose("Puser#push()","destionation type:",d);b(a,d)})}log.heading="push";log.level="warn";var k={FILE:"f",DIR:"d",NEW:"n"};module.exports=p;p.prototype.push=function(d,a,b,c){log.verbose("Puser#push()","srcPaths:",d,", dstPath:",a);var e=this,l,g;e.startTime=(new Date).getTime();
e.copyfilesCount=0;e.totalSize=0;async.waterfall([function(a){if(b.session)return a(null,b.session);new novacom.Session(b.device,a)},function(c,f){b.session=c;t(c,a,function(a,b){l=b;!a&&b===k.FILE&&1<d.length&&(a=Error("The desination exists as a file."));f(a)})},function(c){var f,h=b.session;async.eachSeries(d,function(c,n){async.waterfall([fs.lstat.bind(fs,c),function(b,e){f=a;b.isFile()&&1===d.length?(l===k.DIR&&(f=path.join(a,path.basename(c))),g=k.FILE):g=l;e()},function(a){q.call(e,h,c,f,g,
b,a)}],function(a){n(a)})},c)}],function(a){var b={};if(!a){var d=((new Date).getTime()-e.startTime)/1E3;console.log(e.copyfilesCount+" file(s) pushed");console.log(Math.round(e.totalSize/(1024*d))+" KB/s ("+e.totalSize+" bytes in "+d+"s)");b.msg="Success"}c(a,b)})}})();