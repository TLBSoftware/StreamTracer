'use strict';

var https = require('https');
let arrayofusers = [];


function RequestUser(username, callback){
    let stringSum = "";
    //https get request, response sends back data in packets so you need to use event callbacks
    https.get(`https://teamtreehouse.com/${username}.json`, response => {
        //on recieving packets of data
        response.on('data', packet => {
            stringSum+=packet.toString();
        })
        //on the end of retrieval of data, do a callback with the completed data
        response.on('end', () => {
            arrayofusers.push(JSON.parse(stringSum));
            callback(JSON.parse(stringSum));
            
        })
        response.on('error', error => {
            console.error(error);
        })
    })
}

function init(){
    console.log("start");
    //obj for second parameter, is not being used and can be removed
    var taylor, tyler;
    RequestUser("taylorbryant", processStringSumIntoJSON);
    RequestUser("usbankhelfrich", processStringSumIntoJSON);
    console.log("done");
}
const processStringSumIntoJSON = (stringsum) => {console.log(stringsum.name)}
/** callback function passed for all of the response.ends
*  used as a measure to wait till the users were both downloaded and then performed the asynchronous writes
*/

function LogAllUsers(){
    if(arrayofusers.length == 2){
        for(let users of arrayofusers){
            let fileName = users.profile_name + ".json";
            //require('fs').writeFile(fileName, JSON.stringify(users));
            console.log(fileName);
        }
    }
}
init();