var path = require('path'),
 srcDir = path.join(__dirname,'..','src'),
 blanket =  require('blanket');
 blanket({
 	pattern: srcDir
 });