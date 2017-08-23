var http = require('http')
var Websocket = require('ws')
var readline = require('readline')
var socket = new Websocket.Server({ port: 8080 })
var error = null

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

socket.on('connection', function connection(ws) {
  
  console.log('CONNECT FROM CLIENT')
  ws.send('SERVER CONNECTED')
  
  rl.on('line', (input) => {
    ws.send(input)
  })
  ws.onmessage = function (e) {
    if(e.data === 'close') {
      socket.close()
      rl.close()
    }
    console.log(`Client : ${e.data}`)
  }
  ws.onclose = function (event) {
    console.log('CLIENT LEFT')
    rl.close()
  }
  ws.onerror = function (event) {
    error = `${event.type}: ${event.syscall} ${event.code} ${event.address}:${event.port}`
    console.log(error)
    rl.close()
  }

})