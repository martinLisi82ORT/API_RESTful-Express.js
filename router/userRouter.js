import express from 'express'
import ControladorUser from '../controlador/userControlador.js'

class RouterUser {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorUser = new ControladorUser(persistencia)      
    }

    start() {
        this.router.get('/user/:id?', this.controladorUser.mostrarUser)
        this.router.get('/cantidadUsers', this.controladorUser.cantidadUser)
        this.router.post('/login', this.controladorUser.loginUser)
        this.router.post('/', this.controladorUser.agregarUsuario)
        this.router.put('/:id', this.controladorUser.actualizarUsuario)
        this.router.delete('/:id', this.controladorUser.eliminarUsuario)

        return this.router
    }
}

export default RouterUser