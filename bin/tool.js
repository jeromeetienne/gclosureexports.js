#!/usr/bin/env node

var dumpJscode	= true;
var dumpExports	= true;

// parse command line arguments
process.argv.shift();
process.argv.shift();
while(true){
	if(process.argv[0] === '--nodumpjscode'){
		dumpExports	= false;		
		continue;
	}
	console.assert(process.argv.length === 2)
	var jscodeFname	= process.argv[0];
	var exportsFname= process.argv[1];
	break;
}

var window = {};

// include the gclosureexports library itself
var gclosureStr	= require('fs').readFileSync(__dirname+'/../gclosureexports.js', 'utf8');
var jscodeStr	= require('fs').readFileSync(jscodeFname, 'utf8');
var exportsStr	= require('fs').readFileSync(exportsFname, 'utf8');

var codeStr	= "";
codeStr		+= [
	"",
	"window = {};",
	""
].join('\n');
codeStr		+= gclosureStr + jscodeStr + exportsStr;
codeStr		+= [
	"",
	"gclosureExports.dump();",
	""
].join('\n');


var tempfile	= "slota.tmp.js";
require('fs').writeFileSync(tempfile, codeStr, 'utf8')


require('child_process').exec('node '+tempfile, function (error, stdout, stderr){
	// dump it in google closure compiler format
	if( dumpJscode )	console.log(jscodeStr);
	// dump the exports
	if( dumpExports )	console.log(stdout)
})



