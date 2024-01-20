import ModelUsuarioFile from "./usuarioModelFile.js"
import ModelUsuarioMongoDB from "./usuariosModelMongo.js"

class ModelFactoryUsuario {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('**** Persistiendo en MongoDB ****')
                return new ModelUsuarioMongoDB()

            default:
                console.log('**** Persistiendo en File System (default) ****')
                return new ModelUsuarioFile()
        }
    }

}

export default ModelFactoryUsuario
