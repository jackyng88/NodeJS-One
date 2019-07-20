const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
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
}

/*
Exporting with node.js
module.exports is a global object exposed by node, where when importing it will look into that
globally exposed object. Setting module.exports to a JSON object is also possible. You can even
export multiple things i.e. 

module.exports = {
  handler: requestHandler,
  exampleText: 'Example Text'
};

So in the import to access requestHandler it would be like accessing a method i.e. routes.handler to invoke.

*/
// module.exports = requestHandler;
//module.exports.handler = requestHandler;

// Short-hand from node.js
exports.handler = requestHandler;