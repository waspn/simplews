var WebSocket = require('ws')
var readline = require('readline')
const url = 'ws://echo.websocket.org'
const internal = 'ws://localhost:8ß080'
var socket = new WebSocket(internal)
var error = null

const user = process.argv[2] ? process.argv[2] : 'anonymous'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


socket.onopen = function (event) {
  console.log('OPEN CONNECTION')
  console.log(`LOG IN AS ${user}`)
  //socket.send(socket.readyState)
  
  rl.on('line', (input) => {
    socket.send(`${user}: ${input}`)
  })
}

socket.on('close', (event) => {
  console.log('CONNECTION CLOSED , thanks for connect')
  rl.close()
})

socket.on('message', (event) => {
  if (event.data === 'close') {
    socket.close()
    rl.close()
  }
  else {
    console.log(event.data)
  }
})

socket.onerror = function (event) {
  error = `${event.type}: ${event.syscall} ${event.code} ${event.address}:${event.port}`
  console.log(error)
  rl.close()
}
