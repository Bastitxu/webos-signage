var async=require("async"),npmlog=require("npmlog"),novacom=require("./novacom");
(function(){var b=npmlog;b.heading="logger";b.level="warn";var d={reboot:function(d,e){var c;b.info("reboot#reboot()");async.series([function(a){c=new novacom.Session(d,a)},function(a){if("root"===c.getDevice().username)console.log("Device will reboot..."),c.run("/sbin/reboot -f",null,null,null,function(){}),setTimeout(function(){a()},1E3);else return a(Error("Unable to reboot device. (Only working with rooted devices)"))}],function(a,b){e(a)})}};"undefined"!==typeof module&&module.exports&&(module.exports=
d)})();
