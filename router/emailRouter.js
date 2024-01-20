import express from 'express'
import ControladorEmail from '../controlador/emailControlador.js'

class RouterEmail {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorMail = new ControladorEmail(persistencia)      
    }

    start() {
        this.router.post('/', this.controladorMail.mandarMail)

        return this.router
    }
}

export default RouterEmail