import config from '../config.js'
import ModelFactory from '../model/DAO/pacientesFactory.js'
import { validar } from './validaciones/pacientesValidaciones.js'

class Servicio {
    constructor(persistencia) {
        this.model = ModelFactory.get(persistencia)
    }

    mostrarPaciente = async id => {
        const paciente = await this.model.mostrarPaciente(id)
        return paciente
    }

    calcularPromedioEdad = async () => {
        const pacientes = await this.model.mostrarPaciente()
        let promedio = 0
        if (pacientes.length != 0) {
            const suma = pacientes.map(paciente => paciente.edad).reduce((acc, edad) => acc + edad, 0)
            promedio = suma / pacientes.length
        }
        return promedio
    }

    devolverCantidad = async () => {
        const cantidad = await this.model.mostrarPaciente()
        return cantidad.length
    }

    agregarPaciente = async paciente => {
        const res = validar(paciente)
        if (res.result) {
            const pacienteAgregado = await this.model.agregarPaciente(paciente)
            return pacienteAgregado
        }
        else {
            console.log(res.error)
            throw res.error
        }
    }

    actualizarPaciente = async (id, paciente) => {
        const pacienteActualizado = await this.model.actualizarPaciente(id, paciente)
        return pacienteActualizado
    }

    eliminarPaciente = async id => {
        const pacienteEliminado = await this.model.eliminarPaciente(id)
        return pacienteEliminado
    }
}

export default Servicio
