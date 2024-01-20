import ModeloProfesionalFile from "./profesionalesModelFile.js"
import ModelProfesionalMongoDB from "./profesionalesModelMongo.js"


class ModelFactoryProfesional {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('**** Persistiendo en MongoDB ****')
                return new ModelProfesionalMongoDB()

            default:
                console.log('**** Persistiendo en File System (default) ****')
                return new ModeloProfesionalFile()
        }
    }

}

export default ModelFactoryProfesional
