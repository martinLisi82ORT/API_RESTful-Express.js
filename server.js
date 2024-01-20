import express from 'express'
import CnxMongoDB from './model/DBMongo.js'
import RouterPaciente from './router/pacienteRouter.js'
import RouterProfesional from './router/profesionalRouter.js'
import RouterUser from './router/userRouter.js'
import RouterEmail from './router/emailRouter.js'

class Server {
    constructor(port, persistencia) {
        this.port = port
        this.persistencia = persistencia
        
        this.app = express()
        this.server = null
    }



    async start() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))

        const routerEmail = new RouterEmail(this.persistencia)
        const routerPaciente = new RouterPaciente(this.persistencia)
        const routerProfesional = new RouterProfesional(this.persistencia)
        const routerUser = new RouterUser(this.persistencia)

        /* ------------------------------------------------------------- */
        /*             ZONA DE RUTAS MANEJADAS POR EL ROUTER             */
        /* ------------------------------------------------------------- */

        this.app.use('/api/clinica/pacientes', routerPaciente.start())
        this.app.use('/api/clinica/profesionales', routerProfesional.start())
        this.app.use('/api/clinica/user', routerUser.start())
        this.app.use('/api/clinica/email', routerEmail.start())

        /* ------------------------------------------------------------- */
        /*                      Servidor LISTEN                          */
        /* ------------------------------------------------------------- */

        if (this.persistencia == 'MONGODB') {
            await CnxMongoDB.conectar()
        }

        const PORT = this.port
        this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
        this.server.on('error', error => console.log('Servidor express en error:', error))
    }

    async stop() {
        if (this.server) {
            this.server.close()
            await CnxMongoDB.desconectar()
            this.server = null
        }

    }

}

export default Server
