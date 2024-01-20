import config from "../config.js"
import ModelFactoryUsuario from "../model/DAO/usuariosFactory.js"
import { validar } from "./validaciones/usuariosValidaciones.js"
import EmailService from './emailServicio.js'

class ServicioUser {
    constructor(persistencia) {
        this.model = ModelFactoryUsuario.get(persistencia)
    }

    mostrarUser = async id => {
        const usuario = await this.model.mostrarUser(id)
        return usuario
    }

    cantidadUser = async () => {
        const cantidad = await this.model.mostrarUser()
        return cantidad.length
    }

    loginUser  = async email => {
        const usuario = await this.model.loginUser(email)
        return usuario
    }

    agregarUsuario = async usuario => {
        const res = validar(usuario)
        if (res.result) {
            const usuarioAgregado = await this.model.agregarUsuario(usuario)
            const mailContext = {from: 'ortspital@gmail.com', to: usuario.email, subject: 'Su usuario fue registrado', text: 'Usted registró un usuario con este mail en la plataforma virtual ORTspital'}
            const mailService = new EmailService()
            mailService.mandarEmail(mailContext)
            return usuarioAgregado
        } else {
            console.log(res.error)
            throw res.error
        }
    }

    actualizarUsuario = async (id, usuario) => {
        const usuarioActualizado = await this.model.actualizarUsuario(id, usuario)
        return usuarioActualizado
    }

    eliminarUsuario = async id => {
        const usuarioEliminado = await this.model.eliminarUsuario(id)
        return usuarioEliminado
    }
}

export default ServicioUser