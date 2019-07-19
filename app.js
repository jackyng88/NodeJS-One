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
      // writeFile is preferred to writeFileSync() in most situations, third argument is a callback.
      fs.writeFile('message.txt', message, (err) => {
        //res.writeHead(302, {});
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
      });
    });
    
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


/*
Node.js is an event driven language and thus as seen in line 31 for instance, that is the preferred
method of working with the asynchronous nature of Node.js

Some information about how node.js manages it's work - 

1. Only uses one single Javascript thread
    Performance - In an example of say a large file upload and as stated earlier Node uses an Event Loop
    and call backs. However this event loop only handles quickly finishing code. The FS code and other longer
    taking events are sent to a worker pool (also managed by node.js). The worker pool does the heavy lifting
    and exists independently of your code and can spin up multiple threads. If for instance reading a large file
    completes, it triggers a callback to the event loop. 

    Security - 

2. The Event Loop - 
    Initiated by node.js that handles all the call backs. Follows a specific order for call backs.
    A. Timer - checks for timer callbacks (setTimeout, setInterval).
    B. Pending Callbacks - execute I/O callbacks (~blocking operations) that were deferred. 
    C. Poll phase - retrieve new I/O events and trigger their callbacks if possible. If not, it will defer 
       and register as a pending callback like in B. In the poll phase, will also check for any timer callbacks.
       If any exist it will jump to that and run right away.
    D. Check phase - execute setImmediate() callbacks. 
    E. Close callbacks - execute all close event callbacks. 
    F. process.exit - occurs when refs == 0 i.e. when the references to the open event listeners becomes 0.
       Of course in a normal scenario with a server the refs will usually always remain at least 1 to maintain that
       the server runs continuously. So we don't exit this event loop in a normal node.js webserver. 
*/