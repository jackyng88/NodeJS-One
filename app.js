// require is how you import files in node.js
// it takes either a path to another file, or a core module.
// examples of core modules - http, https, fs, os, path
const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  //process.exit();
  const url = req.url;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && req.method === 'POST') {
    // on() allows us to listen for an event. First arguement is the event, second
    // is the function that gets invoked from the event.
    // The data event will fired whenever a new chunk is ready to be read.
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    //res.writeHead(302, {});
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
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
