import ServicioProfesional from "../servicio/profesionalServicio.js"

class ControladorProfesional {
    constructor(persistencia) {
        this.servicioProf = new ServicioProfesional(persistencia)
    }

    mostrarProfesional = async (req, res) => {
        const { id } = req.params
        const profesionales = await this.servicioProf.mostrarProfesional(id)
        res.json(profesionales)
    }
    
    mostrarProfesionalPorID = async (req, res) => {
        const { id } = req.params
        const profesionales = await this.servicioProf.mostrarProfesional(id)
        res.json(profesionales)
    }

    cantidadProfesional = async (req, res) => {
        const cantidad = await this.servicioProf.cantidadProfesional()
        res.json({ cantidad })
    }

    mostrarEspecialidad = async (req, res) => {
        const { id } = req.params
        const especialidad = await this.servicioProf.mostrarEspecialidad(id)
        res.json({ especialidad })
    }

    agregarProfesional = async (req, res) => {
        try {
            const profesional = req.body
            const profesionalGuardado = await this.servicioProf.agregarProfesional(profesional)
            res.json(profesionalGuardado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    actualizarProfesional = async (req, res) => {
        const { id } = req.params
        const profesional = req.body
        const profesionalGuardado = await this.servicioProf.actualizarProfesional(id, profesional)
        res.json(profesionalGuardado)
    }

    eliminarProfesional = async (req, res) => {
        const { id } = req.params
        const profesionalEliminado = await this.servicioProf.eliminarProfesional(id)
        res.json(profesionalEliminado)
    }
}

export default ControladorProfesional