import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelPacientesMongoDB {
    mostrarPaciente = async id => {
        if (!CnxMongoDB.connection) return id ? {} : []

        if (id) {
            const paciente = await CnxMongoDB.db.collection('pacientes').findOne({ _id: new ObjectId(id) })
            return paciente
        }
        else {
            const pacientes = await CnxMongoDB.db.collection('pacientes').find({}).toArray()
            return pacientes
        }
    }

    agregarPaciente = async paciente => {
        if (!CnxMongoDB.connection) return {}

        const pacienteBuscado = await CnxMongoDB.db.collection('pacientes').findOne({ email: paciente.email })
        if (pacienteBuscado && pacienteBuscado.email == paciente.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            await CnxMongoDB.db.collection('pacientes').insertOne(paciente)
            return paciente
        }
    }

    actualizarPaciente = async (id, paciente) => {
        if (!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('pacientes').updateOne(
            { _id: new ObjectId(id) },
            { $set: paciente }
        )

        const pacientesActualizado = await this.mostrarPaciente(id)
        return pacientesActualizado
    }

    eliminarPaciente = async id => {
        if (!CnxMongoDB.connection) return {}

        const pacientesBorrado = await this.mostrarPaciente(id)
        await CnxMongoDB.db.collection('pacientes').deleteOne({ _id: new ObjectId(id) })
        return pacientesBorrado
    }
}

export default ModelPacientesMongoDB