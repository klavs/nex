#! /usr/bin/node

const getStdin = require('get-stdin');
const transform = require('./transformer');
 
getStdin().then(str => {
    console.log(
        JSON.stringify(
            transform(
                JSON.parse(str)
            )
        )
    );
    //=> 'unicorns' 
}).catch(c => console.error(c));