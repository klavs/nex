#! /usr/bin/node

const getStdin = require('get-stdin');
 
getStdin().then(str => {
    console.log(JSON.stringify(eval(str)));
    //=> 'unicorns' 
});