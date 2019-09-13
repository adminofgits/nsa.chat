const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`, ['-a', '127.0.0.1'])

let chatRoom = "123456"
let chatPort = "3000"
let commandArgsTemplate = "-R nsa-chat-$chatRoom:80:localhost:$chatPort serveo.net"

let commandArgs = commandArgsTemplate.replace(/\$chatRoom/, chatRoom)
commandArgs = commandArgs.replace(/\$chatPort/, chatPort).split(' ')

var reverseSsh = require('child_process').spawn('ssh', commandArgs)
reverseSsh.stdout.on('data',function(data){
    console.log("data: ", data.toString('utf8'))
})

reverseSsh.stderr.on('data',function(data){
    console.log("data: ", data.toString('utf8'))
})

module.exports = {'server': ps, 'ssh': reverseSsh}