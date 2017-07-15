const fs = require('fs');
const arguments = process.argv.slice(2);
const firstfilename = arguments[0],
    secondfilename = arguments[1];
fs.readFile(firstfilename, 'utf8', function(error, stream){
    fs.readFile(secondfilename, 'utf8', function(err, node){
        const streamjson = JSON.parse(stream);
        const nodejson = JSON.parse(node);

        console.log(streamjson.name);
        console.log(nodejson.name);
        
        //console.log(JSON.parse(arguments[0]).name);

    })
})
