import fs from 'fs'

class ModelPacienteFile {
    constructor() {
        this.nombreArchivo = 'pacientes.json'
    }

    leerArchivo = async nombre => {
        let pacientes = []
        try {
            pacientes = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }
        return pacientes
    }

    escribirArchivo = async (nombre, pacientes) => {
        await fs.promises.writeFile(nombre, JSON.stringify(pacientes, null, '\t'))
    }

    mostrarPaciente = async id => {
        try {
            const pacientes = await this.leerArchivo(this.nombreArchivo)
            if (id) {
                const paciente = pacientes.find(paciente => paciente.id === id)
                return paciente || {}
            }
            else {
                return pacientes
            }
        }
        catch {
            return id ? {} : []
        }
    }

    agregarPaciente = async paciente => {
        const pacientes = await this.leerArchivo(this.nombreArchivo)
        const pacienteBuscado = pacientes.find(user => user.email === paciente.email)
        if (pacienteBuscado && pacienteBuscado.email === paciente.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            paciente.id = String(parseInt(pacientes[pacientes.length - 1]?.id || 0) + 1)
            paciente.edad = Number(paciente.edad)
            pacientes.push(paciente)
            await this.escribirArchivo(this.nombreArchivo, pacientes)

            return paciente
        }
    }

    actualizarPaciente = async (id, paciente) => {
        paciente.id = id

        const pacientes = await this.leerArchivo(this.nombreArchivo)
        const index = pacientes.findIndex(paciente => paciente.id === id)
        if (index != -1) {
            const pacienteAnt = pacientes[index]
            const pacienteNuevo = { ...pacienteAnt, ...paciente }
            pacientes.splice(index, 1, pacienteNuevo)
            await this.escribirArchivo(this.nombreArchivo, pacientes)
            return pacienteNuevo
        }
        else {
            pacientes.push(paciente)
            await this.escribirArchivo(this.nombreArchivo, pacientes)
            return paciente
        }
    }

    eliminarPaciente = async id => {
        let paciente = {}
        const pacientes = await this.leerArchivo(this.nombreArchivo)
        const index = pacientes.findIndex(paciente => paciente.id === id)
        if (index != -1) {
            paciente = pacientes.splice(index, 1)[0]
            await this.escribirArchivo(this.nombreArchivo, pacientes)
        }
        return paciente
    }
}

export default ModelPacienteFile