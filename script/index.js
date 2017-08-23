const WebSocket = require('ws')
const readline = require('readline')
var url = 'ws://echo.websocket.org'
var internal = 'ws://localhost:8080'
var socket = new WebSocket(internal)
var error = null

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


socket.onopen = function (event) {
  console.log('WEBSOCKET CONNECT')
  rl.on('line', (input) => {
    socket.send(input)
  })
}

socket.onclose = function (event) {
  console.log('CONNECTION CLOSED , thanks for connect')
  rl.close()
}

socket.onmessage = function (event) {
  if (event.data === 'close') {
    socket.close()
    rl.close()
  }
  else {
    console.log('Server : ' + event.data)
  }
}

socket.onerror = function (event) {
  error = `${event.type}: ${event.syscall} ${event.code} ${event.address}:${event.port}`
  console.log(error)
  rl.close()
}
