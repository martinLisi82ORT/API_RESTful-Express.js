import ServicioEmail from '../servicio/emailServicio.js'

class ControladorEmail {
    constructor(persistencia) {
        this.servicio = new ServicioEmail(persistencia)
    }

    mandarMail = async (req, res) => {
        const mailContext = req.body
        const pacientes = await this.servicio.mandarEmail(mailContext)
        res.json(pacientes)
    }
}

export default ControladorEmail