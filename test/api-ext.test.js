import { expect, should } from "chai"
import supertest from "supertest"
import generador from "./generador/pacienteGenerador.js"

//Test de integracion del servidor
const request = supertest('http://127.0.0.1:8080')

describe('test apirestful', () => {
    describe('GET', () => {
        it('deberia retornar un status 200', async () => {
            const response = await request.get('/api/clinica/pacientes')
            expect(response.status).to.eql(200)
        })
    })
   
    describe('POST', () => {
        it('deberia incorporar un paciente', async () => {
            //Genera un paciente aleatorio
            const paciente = generador.get()

            const response = await request.post('/api/clinica/pacientes').send(paciente)
            expect(response.status).to.eql(200)

            const pacGuardado = response.body
            expect(pacGuardado).to.include.keys('nombre', 'apellido', 'edad', 'email')

            //Compara si el pasiente creado corresponde a la respuesta del servidor
            expect(pacGuardado.nombre).to.eql(paciente.nombre)
            expect(pacGuardado.apellido).to.eql(paciente.apellido)
            expect(pacGuardado.edad).to.eql(paciente.edad)
            expect(pacGuardado.email).to.eql(paciente.email)
        })
    })

    describe('PUT', () => {
        it('deberia actualizar un paciente', async () => {

            //Actualiza nombre
            const actNom = { nombre: "Juan" }
            const response = await request.put('/api/clinica/pacientes/id').send(actNom)
            expect(response.status).to.eql(200)
        })
    })

    describe('DELETE', () => {
        it('deberia eliminar un paciente', async () => {
            //Genera un paciente aleatorio
            const paciente = generador.get()
            const response = await request.post('/api/clinica/pacientes').send(paciente)

            //Elimina al paciente creado
            const pacEliminar = response.body
            const response1 = await request.delete('/api/clinica/pacientes/id').send(pacEliminar)
            expect(response1.status).to.eql(200)
        })
    })

})