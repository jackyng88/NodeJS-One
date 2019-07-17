// require is how you import files in node.js
// it takes either a path to another file, or a core module.
// examples of core modules - http, https, fs, os, path
const http = require('http');

/*
function requestListener(req, res) {

}

http.createServer(requestListener);
*/

/*
http.createServer(function(req,res) {

});
*/

const server = http.createServer((req, res) => {
    console.log(req);
});

// listen starts a process where our node.js will not immediately exit and will "listen".

server.listen(3000);
