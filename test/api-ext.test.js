import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/pacienteGenerador.js"


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
            const paciente = generador.get()
            console.log(paciente)

            const response = await request.post('/api/clinica/pacientes').send(paciente)
            expect(response.status).to.eql(200)

            const pacGuardado = response.body
            console.log(pacGuardado)
            expect(pacGuardado).to.include.keys('nombre', 'edad', 'email')

            expect(pacGuardado.nombre).to.eql(paciente.nombre)
            expect(pacGuardado.edad).to.eql(paciente.edad)
            expect(pacGuardado.email).to.eql(paciente.email)
        })
    })

})