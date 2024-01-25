import fs from 'fs'

class ModelUsuarioFile {
    constructor() {
        this.nombreArchivo = 'usuarios.json'
        this.nombreArchivoPacientes = 'pacientes.json'
        this.nombreArchivoProfesionales = 'profesionales.json'
    }

    leerArchivo = async nombre => {
        let usuarios = []
        try {
            usuarios = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }
        return usuarios
    }
    // leerArchivoPac = async nombre => {
    //     let pacientes = []
    //     try {
    //         pacientes = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
    //     }
    //     catch { }
    //     return pacientes
    // }
    // leerArchivoProf = async nombre => {
    //     let profesionales = []
    //     try {
    //         profesionales = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
    //     }
    //     catch { }
    //     return profesionales
    // }

    escribirArchivo = async (nombre, usuarios) => {
        await fs.promises.writeFile(nombre, JSON.stringify(usuarios, null, '\t'))
    }

    escribirArchivoPacientes = async (nombre, usuarios) => {
        await fs.promises.writeFile(nombre, JSON.stringify(usuarios, null, '\t'))
    }

    escribirArchivoprofesionales = async (nombre, usuarios) => {
        await fs.promises.writeFile(nombre, JSON.stringify(usuarios, null, '\t'))
    }

    mostrarUser = async id => {      
        try {
            const usuarios = await this.leerArchivo(this.nombreArchivo)
            if (id) {
                const usuario = usuarios.find(usuario => usuario.id === id)
                return usuario || {}
            }
            else {
                return usuarios
            }
        }
        catch {
            return id ? {} : []
        }
    }

    loginUser = async login => {
        const usuarios = await this.leerArchivo(this.nombreArchivo)
        const us = usuarios.find(user => user.email === login.email & user.password === login.password)
        if (us) {
            return { Mensaje: 'Acceso permitido' }
        }
        else {
            return { error: 'Usuario no registrado' }
        }
    }

    agregarUsuario = async usuario => {
        const usuarios = await this.leerArchivo(this.nombreArchivo)
        const usuariosPac = await this.leerArchivo(this.nombreArchivoPacientes)
        const usuariosProf = await this.leerArchivo(this.nombreArchivoProfesionales)
        const us = usuarios.find(user => user.email === usuario.email)


        if (us && us.email == usuario.email) {
            console.log('Usuario ya registrado')
            return { error: 'Usuario ya registrado' }
        }
        else {
            usuario.id = String(parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1)
            usuario.edad = Number(usuario.edad)
            usuarios.push(usuario)
            usuariosPac.push(usuario)
            usuariosProf.push(usuario)

            await this.escribirArchivo(this.nombreArchivo, usuarios)

            if (usuario.rol == 'Paciente') {
                //Agrega lista de Pacientes
                await this.escribirArchivoPacientes(this.nombreArchivoPacientes, usuariosPac)
            }
            else {
                //Agrega lista de Profesionales
                await this.escribirArchivoprofesionales(this.nombreArchivoProfesionales, usuariosProf)
            }
            return usuario
        }
    }

    actualizarUsuario = async (id, usuario) => {
        usuario.id = id

        const usuarios = await this.leerArchivo(this.nombreArchivo)
        const usuariosPac = await this.leerArchivo(this.nombreArchivoPacientes)
        const usuariosProf = await this.leerArchivo(this.nombreArchivoProfesionales)

        const user = await this.mostrarUser(id)

        const index = usuarios.findIndex(usuario => usuario.id === id)
        if (index != -1) {
            const usuarioAnt = usuarios[index]
            const usuarioNuevo = { ...usuarioAnt, ...usuario }
            usuarios.splice(index, 1, usuarioNuevo)

            await this.escribirArchivo(this.nombreArchivo, usuarios)
            if (user.rol == 'Paciente') {
                //Actualiza lista de Pacientes
                const indexPac = usuariosPac.findIndex(usuario => usuario.id === id)
                usuariosPac.splice(indexPac, 1, usuarioNuevo)
                await this.escribirArchivoPacientes(this.nombreArchivoPacientes, usuariosPac)
            }
            else {
                //Actualiza lista de Profesionales
                const indexProf = usuariosProf.findIndex(usuario => usuario.id === id)
                usuariosProf.splice(indexProf, 1, usuarioNuevo)
                await this.escribirArchivoprofesionales(this.nombreArchivoProfesionales, usuariosProf)
            }
            return usuarioNuevo
        }
        else {
            usuarios.push(usuario)
            await this.escribirArchivo(this.nombreArchivo, usuarios)
            await this.escribirArchivoPacientes(this.nombreArchivoPacientes, usuarios)
            await this.escribirArchivoprofesionales(this.nombreArchivoProfesionales, usuarios)
            return usuario
        }
    }

    eliminarUsuario = async id => {
        let usuario = {}
        const usuarios = await this.leerArchivo(this.nombreArchivo)
        const index = usuarios.findIndex(usuario => usuario.id === id)
        if (index != -1) {
            usuario = usuarios.splice(index, 1)[0]
            await this.escribirArchivo(this.nombreArchivo, usuarios)


            if (usuario.rol == 'Paciente') {
                //Elimina de lista de Pacientes
                let usuarioPac = {}
                const usuariosPac = await this.leerArchivo(this.nombreArchivoPacientes)
                const indexPac = usuariosPac.findIndex(usuarioPac => usuarioPac.email === usuario.email)
                usuarioPac = usuariosPac.splice(indexPac, 1)[0]
                await this.escribirArchivoPacientes(this.nombreArchivoPacientes, usuariosPac)
            } else {
                //Elimina de lista de Profesionales
                let usuarioProf = {}
                const usuariosProf = await this.leerArchivo(this.nombreArchivoProfesionales)
                const indexProf = usuariosProf.findIndex(usuarioProf => usuarioProf.email === usuario.email)
                usuarioProf = usuariosProf.splice(indexProf, 1)[0]
                await this.escribirArchivoprofesionales(this.nombreArchivoProfesionales, usuariosProf)
            }
        }
        return usuario
    }
}

export default ModelUsuarioFile