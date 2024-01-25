import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/pacienteGenerador.js"
import Server from "../server.js"

//Test de integracion del servidor como instancia
describe('test apirestful', () => {
    describe('GET', () => {
        it('deberia retornar un status 200', async () => {
            //Levanta un servidor
            const server = new Server(8081, 'FILE')
            const app = await server.start()

            //Crea instancia supertest a partir del nuevo servidor levantado
            const request = supertest(app)
            const response = await request.get('/api/clinica/pacientes')

            expect(response.status).to.eql(200)

            //Detiene el servidor
            await server.stop()
        })
    })

    describe('POST', () => {
        it('deberia incorporar un paciente', async () => {
            //Levanta un servidor
            const server = new Server(8081, 'FILE')
            const app = await server.start()

            //Crea instancia supertest a partir del nuevo servidor levantado
            const request = supertest(app)

            //Genera un paciente aleatorio
            const paciente = generador.get()

            const response = await request.post('/api/clinica/pacientes').send(paciente)
            expect(response.status).to.eql(200)

            const pacGuardado = response.body
            expect(pacGuardado).to.include.keys('nombre', 'apellido', 'edad', 'email', 'rol', 'password')

            //Compara si el pasiente creado corresponde a la respuesta del servidor
            expect(pacGuardado.nombre).to.eql(paciente.nombre)
            expect(pacGuardado.apellido).to.eql(paciente.apellido)
            expect(pacGuardado.edad).to.eql(paciente.edad)
            expect(pacGuardado.email).to.eql(paciente.email)
            expect(pacGuardado.rol).to.eql(paciente.rol)
            expect(pacGuardado.password).to.eql(paciente.password)

            //Detiene el servidor
            await server.stop()
        })
    })

    describe('DELETE', () => {
        it('deberia eliminar un paciente', async () => {
            //Levanta un servidor
            const server = new Server(8081, 'FILE')
            const app = await server.start()

            //Crea instancia supertest a partir del nuevo servidor levantado
            const request = supertest(app)

            //Genera un paciente aleatorio
            const paciente = generador.get()
            const response = await request.post('/api/clinica/pacientes').send(paciente)

            //Elimina al paciente creado
            const pacEliminar = response.body
            const response1 = await request.delete('/api/clinica/pacientes/pacEliminar.id').send(pacEliminar)
            expect(response1.status).to.eql(200)

            //Detiene el servidor
            await server.stop()
        })
    })

})