import fs from 'fs'

class ModeloProfesionalFile {
    constructor() {
        this.nombreArchivo = 'profesionales.json'
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
            profesional.especialidad = String(profesional.especialidad)
            profesionales.push(profesional)
            await this.escribirArchivo(this.nombreArchivo, profesionales)

            return profesional
        }
    }

    actualizarProfesional = async (id, profesional) => {
        profesional.id = id

        const profesionales = await this.leerArchivo(this.nombreArchivo)
        const index = profesionales.findIndex(profesional => profesional.id === id)
        if (index != -1) {
            const profesionalAnt = profesionales[index]
            const profesionalNuevo = { ...profesionalAnt, ...profesional }
            profesionales.splice(index, 1, profesionalNuevo)
            await this.escribirArchivo(this.nombreArchivo, profesionales)
            return profesionalNuevo
        }
        else {
            profesionales.push(profesional)
            await this.escribirArchivo(this.nombreArchivo, profesionales)
            return profesional
        }
    }

    eliminarProfesional = async id => {
        let profesional = {}
        const profesionales = await this.leerArchivo(this.nombreArchivo)
        const index = profesionales.findIndex(profesional => profesional.id === id)
        if (index != -1) {
            profesional = profesionales.splice(index, 1)[0]
            await this.escribirArchivo(this.nombreArchivo, profesionales)
        }
        return profesional
    }
}

export default ModeloProfesionalFile