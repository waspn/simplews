const WebSocket = require('ws')
const readline = require('readline')
var url = 'ws://echo.websocket.org'
var socket = new WebSocket(url)

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
  console.log('CONNECTION CLOSE , thanks for connect')
}

socket.onmessage = function (event) {
  if (event.data === 'close') {
    socket.close()
    rl.close()
  }
  else {
    console.log('Received: ' + event.data)
  }
}

socket.onerror = function (event) {
  console.log('ERROR : ' + event)
}
