const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const path      = require('path');
const Sockets   = require('./sockets')

class Server {

    constructor(){

        this.app = express();;
        this.port = process.env.PORT;

        // Http Server
        this.server =  http.createServer(this.app);

        // Configuracion de sockets
        this.io = socketio( this.server, { /* configuraciones */});
    }

    midlewares(){
        //Desplegar el ldirectorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){

        // Inicializar midleware
        this.midlewares();

        //Inicializar sockets
        this.configurarSockets();

        // Inicializar Server 
        this.server.listen(this.port, () => {
            console.log("server corriendo");
        });
    }

}

module.exports = Server;