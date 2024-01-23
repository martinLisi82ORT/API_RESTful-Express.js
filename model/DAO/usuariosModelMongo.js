import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelUsuarioMongoDB {
    mostrarUser = async id => {
        if (!CnxMongoDB.connection) return id ? {} : []

        if (id) {
            const usuario = await CnxMongoDB.db.collection('usuarios').findOne({ _id: new ObjectId(id) })
            return usuario
        }
        else {
            const usuarios = await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            return usuarios
        }
    }

    loginUser = async login => {
        if (!CnxMongoDB.connection) return id ? {} : []

        const usuario = await CnxMongoDB.db.collection('usuarios').findOne({ email: login.email, password: login.password })
        if (usuario) {
            return { Mensaje: 'Acceso permitido' }
        }
        else {
            return { error: 'Usuario no registrado' }
        }
    }

    agregarUsuario = async usuario => {
        if (!CnxMongoDB.connection) return {}

        const usuarioBuscado = await CnxMongoDB.db.collection('usuarios').findOne({ email: usuario.email })
        if (usuarioBuscado && usuarioBuscado.email == usuario.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            await CnxMongoDB.db.collection('usuarios').insertOne(usuario)

            if (usuario.rol == 'Paciente') {
                await CnxMongoDB.db.collection('pacientes').insertOne({ nombre: usuario.nombre, apellido: usuario.apellido, edad: usuario.edad, email: usuario.email })

            } else {
                await CnxMongoDB.db.collection('profesionales').insertOne({ nombre: usuario.nombre, apellido: usuario.apellido, edad: usuario.edad, email: usuario.email })

            }
            return usuario
        }
    }

    actualizarUsuario = async (id, usuario) => {
        if (!CnxMongoDB.connection) return {}
                
        const usuarioBuscado = await this.mostrarUser(id)

        await CnxMongoDB.db.collection('usuarios').updateOne(
            { _id: new ObjectId(id) },
            { $set: usuario }
        )

        if (usuarioBuscado.rol == 'Paciente') {
            const usuarioPaciente = await CnxMongoDB.db.collection('pacientes').findOne({ email: usuarioBuscado.email })
            await CnxMongoDB.db.collection('pacientes').updateOne(
                { _id: usuarioPaciente._id },
                { $set: usuario }
            )
        } else {
            const usuarioProesional = await CnxMongoDB.db.collection('profesionales').findOne({ email: usuarioBuscado.email })
            await CnxMongoDB.db.collection('profesionales').updateOne(
                { _id: usuarioProesional._id },
                { $set: usuario }
            )
        }

        const usuarioActualizado = await this.mostrarUser(id)
        return usuarioActualizado
    }

    eliminarUsuario = async id => {
        if (!CnxMongoDB.connection) return {}

        const usuarioEliminado = await this.mostrarUser(id)
        await CnxMongoDB.db.collection('usuarios').deleteOne({ _id: new ObjectId(id) })

        if (usuarioEliminado.rol == 'Paciente') {
            const usuarioPaciente = await CnxMongoDB.db.collection('pacientes').findOne({ email: usuarioEliminado.email })
            await CnxMongoDB.db.collection('pacientes').deleteOne({ _id: usuarioPaciente._id })
        } else {
            const usuarioProesional = await CnxMongoDB.db.collection('profesionales').findOne({ email: usuarioEliminado.email })
            await CnxMongoDB.db.collection('profesionales').deleteOne({ _id: usuarioProesional._id })
        }

        return usuarioEliminado
    }
}

export default ModelUsuarioMongoDB