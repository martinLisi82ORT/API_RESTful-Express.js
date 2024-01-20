import ModelPacientesMongoDB from "./pacientesModelMongo.js"
import ModelPacienteFile from "./pacientesModeloFile.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {

            case 'MONGODB':
                console.log('**** Persistiendo en MongoDB ****')
                return new ModelPacientesMongoDB()
                
            default:
                console.log('**** Persistiendo en File System (default) ****')
                return new ModelPacienteFile()
        }
    }
}

export default ModelFactory