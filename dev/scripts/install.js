var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { 
	console.log(stdout); 
}
exec("cd ../../node_modules/babel-plugin-mjsxbabel", puts);
exec("babel src --out-dir lib", puts);
