const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  // console.log('Client connected');
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          messageType: 'userCount',
          payload: wss.clients.size
        }));
      }
    })

  ws.on('open', function open() {
  // ws.send('something');
  console.log('connection open');
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //   }
    });
  //   console.log('connection opened');
  // console.log('Users: ', wss.clients.size);
  //   client.send(wss.clients.size);
  // });

  ws.on('message', function incoming(data) {
    const newMessage = JSON.parse(data);
    newMessage.id = uuidv1();
    const messageContainer = {messageType: 'message', payload: newMessage}
    const messageString = JSON.stringify(messageContainer);
    // console.log(newMessage);
    console.log('new message received:', messageString);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log('sending', messageString);
        client.send(messageString)
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          messageType: 'userCount',
          payload: wss.clients.size
        }));
      }
    })
    console.log('Client disconnected');
  });
});