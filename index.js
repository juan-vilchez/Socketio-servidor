`use strict`
const app = require('express')()


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



const serverHttp = require('http').Server(app)
const io = require('socket.io')(serverHttp)


const myMessages = []

io.on('connection', function(socket){
    socket.on('send-message', function(data){
        myMessages.push(data)
        socket.emit('text-event', myMessages)
        socket.broadcast.emit('text-event', myMessages)
    })
})

serverHttp.listen(3000, () => {
    console.log(`El servidor esta ejecutandose en el puesto ${3000}`)
})