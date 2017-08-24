var http = require('http')
var WebSocket = require('ws')
var readline = require('readline')
var socket = new WebSocket.Server({ port: 8080, clientTracking: true })
var error = null

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
/*
socket.on('connection', function connection(ws, req) {

  console.log(req.connection)

  console.log('OPEN CONNECTION')
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

})*/


console.log('START SERVER')

socket.on('connection', function connection(ws) {
  
  ws.send('CONNECTED')
  const broadcast = (data) => {
    socket.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }

  rl.on('line', (input) => {
    input === 'close' ? socket.close() :
    broadcast(`Server: ${input}`)
  })

  ws.on('message', (data) => {
    broadcast(data)
  })

  ws.on('close', (event) => {
    console.log('CONNECTION CLOSED')
    rl.close()
  })
  ws.on('error', (event) => {
    error = `${event.type}: ${event.syscall} ${event.code} ${event.address}:${event.port}`
    console.log(error)
    rl.close()
  })

})

