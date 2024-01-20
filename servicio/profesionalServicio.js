import config from "../config.js"
import ModelFactoryProfesional from "../model/DAO/profesionalesFactory.js"
import { validar } from "./validaciones/profesionalValidaciones.js"

class ServicioProfesional {
    constructor(persistencia) {
        this.model = ModelFactoryProfesional.get(persistencia)
    }

    mostrarProfesional = async id => {
        const profesional = await this.model.mostrarProfesional(id)
        return profesional
    }

    cantidadProfesional = async () => {
        const cantidad = await this.model.mostrarProfesional()
        return cantidad.length
    }

    mostrarEspecialidad = async id => {
        const profesional = await this.model.mostrarProfesional(id)
        const especialidad = profesional.especialidad
        return especialidad
    }

    agregarProfesional = async profesional => {
        const res = validar(profesional)
        if (res.result) {
            const profesionalAgregado = await this.model.agregarProfesional(profesional)
            return profesionalAgregado
        } else {
            console.log(res.error)
            throw res.error
        }
    }

    actualizarProfesional = async (id, profesional) => {
        const profesionalActualizado = await this.model.actualizarProfesional(id, profesional)
        return profesionalActualizado
    }

    eliminarProfesional = async id => {
        const profesionalEliminado = await this.model.eliminarProfesional(id)
        return profesionalEliminado
    }
}

export default ServicioProfesional