var semver=require("semver"),path=require("path"),fs=require("fs");
(function(){function g(b){a?b(null,a&&a.engines&&a.engines.node||""):f(function(c){b(c,a&&a.engines&&a.engines.node||"")})}function f(b){var c=path.resolve(__dirname,"..","package.json");fs.readFile(c,function(c,d){c&&b(c);try{a=JSON.parse(d),b()}catch(h){b(h)}})}function k(b){a?b(null,a.version):f(function(c){b(c,a&&a.version||"unknown")})}var e={};"undefined"!==typeof module&&module.exports&&(module.exports=e);var a=null;e.showVersionAndExit=function(){k(function(a,c){console.log("Version: "+c);
process.exit(0)})};e.checkNodeVersion=function(a){g(function(c,b){var d=semver.validRange(b);d?semver.satisfies(process.version,d)?a():(console.error("This command only works on Node.js version: "+d),process.exit(1)):(console.error("Invalid Node.js version range: "+b),process.exit(1))})}})();