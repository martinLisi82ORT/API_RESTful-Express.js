import express from 'express'
import ControladorProfesional from '../controlador/profesionalControlador.js'

class RouterProfesional {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorProf = new ControladorProfesional(persistencia)
    }

    start() {
        this.router.get('/', this.controladorProf.mostrarProfesional)
        this.router.get('/buscarProfesionalPorId:id?', this.controladorProf.mostrarProfesionalPorID)
        this.router.get('/cantidadProfesionales', this.controladorProf.cantidadProfesional)
        this.router.get('/especialidad/:id', this.controladorProf.mostrarEspecialidad)
        this.router.post('/', this.controladorProf.agregarProfesional)
        this.router.put('/:id', this.controladorProf.actualizarProfesional)
        this.router.delete('/:id', this.controladorProf.eliminarProfesional)

        return this.router
    }
}

export default RouterProfesional