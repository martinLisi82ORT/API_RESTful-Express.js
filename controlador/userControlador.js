import ServicioUser from "../servicio/userServicio.js"

class ControladorUser {
    constructor(persistencia) {
        this.servicioUser = new ServicioUser(persistencia)
    }

    mostrarUser = async (req, res) => {
        const { id } = req.params
        const usuario = await this.servicioUser.mostrarUser(id)
        res.json(usuario)
    }

    cantidadUser = async (req, res) => {
        const cantidad = await this.servicioUser.cantidadUser()
        res.json({ cantidad })
    }

    loginUser = async (req, res) => {
        const user = req.body
        const usuario = await this.servicioUser.loginUser(user)
        res.json(usuario)
    }

    agregarUsuario = async (req, res) => {
        try {
            const usuario = req.body
            const usuarioGuardado = await this.servicioUser.agregarUsuario(usuario)
            res.json(usuarioGuardado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    actualizarUsuario = async (req, res) => {
        const { id } = req.params
        const usuario = req.body
        const usuarioGuardado = await this.servicioUser.actualizarUsuario(id, usuario)
        res.json(usuarioGuardado)
    }

    eliminarUsuario = async (req, res) => {
        const { id } = req.params
        const usuarioEliminado = await this.servicioUser.eliminarUsuario(id)
        res.json(usuarioEliminado)
    }
}

export default ControladorUser