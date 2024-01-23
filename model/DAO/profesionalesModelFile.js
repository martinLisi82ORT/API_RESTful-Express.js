import fs from 'fs'

class ModeloProfesionalFile {
    constructor() {
        this.nombreArchivo = 'profesionales.json'
        this.nombreArchivoUser = 'usuarios.json'
    }

    leerArchivo = async nombre => {
        let profesionales = []
        try {
            profesionales = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }
        return profesionales
    }

    escribirArchivo = async (nombre, profesionales) => {
        await fs.promises.writeFile(nombre, JSON.stringify(profesionales, null, '\t'))
    }

    mostrarProfesional = async id => {
        try {
            const profesionales = await this.leerArchivo(this.nombreArchivo)
            if (id) {
                const profesional = profesionales.find(profesional => profesional.id === id)
                return profesional || {}
            }
            else {
                return profesionales
            }
        }
        catch {
            return id ? {} : []
        }
    }

    agregarProfesional = async profesional => {
        const profesionales = await this.leerArchivo(this.nombreArchivo)

        const profesionalBuscado = profesionales.find(user => user.email === profesional.email)
        if (profesionalBuscado && profesionalBuscado.email == profesional.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            profesional.id = String(parseInt(profesionales[profesionales.length - 1]?.id || 0) + 1)
           // profesional.especialidad = String(profesional.especialidad)
            profesionales.push(profesional)
            //Agrega lista Profesionales
            await this.escribirArchivo(this.nombreArchivo, profesionales)
            //Agrega lista Usuarios
            await this.escribirArchivo(this.nombreArchivoUser, profesionales)

            return profesional
        }
    }

    actualizarProfesional = async (id, profesional) => {
        profesional.id = id

        const profesionales = await this.leerArchivo(this.nombreArchivo)
        const index = profesionales.findIndex(profesional => profesional.id === id)
        if (index != -1) {
            //Actualiza lista de Profesionales
            const profesionalAnt = profesionales[index]
            const profesionalNuevo = { ...profesionalAnt, ...profesional }
            profesionales.splice(index, 1, profesionalNuevo)
            await this.escribirArchivo(this.nombreArchivo, profesionales)

            //Actualiza lista de Usuarios
            const indexUser = profesionales.findIndex(profesional => profesional.id === id)
            profesionales.splice(indexUser, 1, profesionalNuevo)
            await this.escribirArchivo(this.nombreArchivoUser, profesionales)

            return profesionalNuevo
        }
        else {
            profesionales.push(profesional)
            await this.escribirArchivo(this.nombreArchivo, profesionales)
            await this.escribirArchivo(this.nombreArchivoUser, pacientes)
            return profesional
        }
    }

    eliminarProfesional = async id => {
        //Elimina de lista de Pacientes
        let profesional = {}
        const profesionales = await this.leerArchivo(this.nombreArchivo)
        const index = profesionales.findIndex(profesional => profesional.id === id)
        if (index != -1) {
            profesional = profesionales.splice(index, 1)[0]
            await this.escribirArchivo(this.nombreArchivo, profesionales)

            //Elimina de lista de Usuarios
            let usuario = {}
            const usuariosProf = await this.leerArchivo(this.nombreArchivoUser)
            const indexUser = usuariosProf.findIndex(usuario => usuario.email === profesional.email)
            usuario = usuariosProf.splice(indexUser, 1)[0]
            await this.escribirArchivo(this.nombreArchivoUser, usuariosProf)
        }
        return profesional
    }
}

export default ModeloProfesionalFile