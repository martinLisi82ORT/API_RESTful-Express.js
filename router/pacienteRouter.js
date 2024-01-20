import express from 'express'
import ControladorPaciente from '../controlador/pacienteControlador.js'

class RouterPaciente {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorPac = new ControladorPaciente(persistencia)      
    }

    start() {
        this.router.get('/', this.controladorPac.mostrarPaciente)
        this.router.get('/buscarPacientePorId/:id', this.controladorPac.mostrarPacientePorID)
        this.router.get('/promedioEdad', this.controladorPac.calcularPromedioEdad)
        this.router.get('/cantidadPacientes', this.controladorPac.devolverCantidad)
        this.router.post('/', this.controladorPac.agregarPaciente)
        this.router.put('/:id', this.controladorPac.actualizarPaciente)
        this.router.delete('/:id', this.controladorPac.eliminarPaciente)

        return this.router
    }
}

export default RouterPaciente
