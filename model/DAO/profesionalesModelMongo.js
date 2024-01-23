import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelProfesionalMongoDB {
    mostrarProfesional = async id => {
        if (!CnxMongoDB.connection) return id ? {} : []

        if (id) {
            const profesional = await CnxMongoDB.db.collection('profesionales').findOne({ _id: new ObjectId(id) })
            return profesional
        }
        else {
            const profesionales = await CnxMongoDB.db.collection('profesionales').find({}).toArray()
            return profesionales
        }
    }

    agregarProfesional = async profesional => {
        if (!CnxMongoDB.connection) return {}

        const profesionalBuscado = await CnxMongoDB.db.collection('profesionales').findOne({ email: profesional.email })
        if (profesionalBuscado && profesionalBuscado.email == profesional.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            await CnxMongoDB.db.collection('profesionales').insertOne(profesional)
            await CnxMongoDB.db.collection('usuarios').insertOne(profesional)
            return profesional
        }
    }

    actualizarProfesional = async (id, profesional) => {
        if (!CnxMongoDB.connection) return {}

        const profesionalBusc = await this.mostrarProfesional(id)

        await CnxMongoDB.db.collection('profesionales').updateOne(
            { _id: new ObjectId(id) },
            { $set: profesional }
        )

        const usuarioBusc = await CnxMongoDB.db.collection('usuarios').findOne({ email: profesionalBusc.email })

        await CnxMongoDB.db.collection('usuarios').updateOne(
            { _id: usuarioBusc._id },
            { $set: profesional }
        )

        const profesionalesActualizado = await this.mostrarProfesional(id)
        return profesionalesActualizado
    }

    eliminarProfesional = async id => {
        if (!CnxMongoDB.connection) return {}

        const profesionalBorrado = await this.mostrarProfesional(id)
        await CnxMongoDB.db.collection('profesionales').deleteOne({ _id: new ObjectId(id) })

        const usuarioBorrado = await CnxMongoDB.db.collection('usuarios').findOne({ email: profesionalBorrado.email })
        await CnxMongoDB.db.collection('usuarios').deleteOne({ _id: usuarioBorrado._id })

        return profesionalBorrado
    }
}

export default ModelProfesionalMongoDB