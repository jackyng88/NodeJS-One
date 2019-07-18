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
    console.log(req.url, req.method, req.headers);
    //process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello From my Nodejs Server!</h1></body>');
    res.write('</html>');
    res.end();
    // We should not write to the response any more after end(). Technically you can still call write() but it will
    // result in an error. You must not change the response after ending it because NodeJS will send the 
    // response back to the client. Note - the preceding write() statements can be simplified using Express.js
    
});

// listen starts a process where our node.js will not immediately exit and will "listen".

server.listen(3000);
