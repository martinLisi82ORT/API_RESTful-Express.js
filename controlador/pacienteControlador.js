import Servicio from '../servicio/pacienteServicio.js'

class ControladorPaciente {
    constructor(persistencia) {
        this.servicio = new Servicio(persistencia)
    }

    mostrarPaciente = async (req, res) => {
        const { id } = req.params
        const pacientes = await this.servicio.mostrarPaciente(id)
        res.json(pacientes)
    }

    mostrarPacientePorID = async (req, res) => {
        const { id } = req.params
        const pacientes = await this.servicio.mostrarPaciente(id)
        res.json(pacientes)
    }

    calcularPromedioEdad = async (req, res) => {

        const promedioEdad = await this.servicio.calcularPromedioEdad()
        res.json({ promedioEdad })

    }

    devolverCantidad = async (req, res) => {
        const cantidad = await this.servicio.devolverCantidad()
        res.json({ cantidad })
    }

    agregarPaciente = async (req, res) => {
        try {
            const paciente = req.body
            const pacienteGuardado = await this.servicio.agregarPaciente(paciente)
            res.json(pacienteGuardado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    actualizarPaciente = async (req, res) => {
        const { id } = req.params
        const paciente = req.body
        const pacienteGuardado = await this.servicio.actualizarPaciente(id, paciente)
        res.json(pacienteGuardado)
    }

    eliminarPaciente = async (req, res) => {
        const { id } = req.params
        const pacienteEliminado = await this.servicio.eliminarPaciente(id)
        res.json(pacienteEliminado)
    }
}

export default ControladorPaciente