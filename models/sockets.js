const BandList = require('./band-list')

class Sockets{

    constructor(io){

        this.io = io;

        this.bandList = new BandList();

        this.socketsEvents();

    }

    socketsEvents(){
        // On connection
        this.io.on('connection', (socket) => { 

            console.log('Cliente Conectado');

            // Emitir al cliente conectado todas las bandas actuales 
            socket.emit('current-bands', this.bandList.getBands() );

            // votar por la banda
            socket.on( 'votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            // borrar banda  
            socket.on( 'borrar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            // cambiar-nombre-banda
            socket.on( 'cambiar-nombre-banda', ({id,nombre}) => {
                this.bandList.changeName(id,nombre);
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            //nueva-banda
            socket.on( 'nueva-banda', ({nombre}) => {
                this.bandList.addband(nombre);
                this.io.emit('current-bands', this.bandList.getBands() );
            })

        });


    }

}

module.exports = Sockets;