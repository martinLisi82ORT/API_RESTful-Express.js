import { expect } from 'chai'
import generador from './generador/pacienteGenerador.js'

describe('**** Test del generador de paciente ****', () => {
    
    it('el paciente debe contener los campos nombre, apellido, edad y email', () => {
       const paciente = generador.get()

       expect(paciente).to.include.keys('nombre', 'apellido','edad','email')
    })

    it('deberia generar pacientes aleatorios', () => {
        const paciente1 = generador.get()
        const paciente2 = generador.get()

        expect(paciente1.nombre).not.to.eql(paciente2.nombre)
        expect(paciente1.apellido).not.to.eql(paciente2.apellido)
        expect(paciente1.edad).not.to.eql(paciente2.edad)
        expect(paciente1.email).not.to.eql(paciente2.email)
    })
    
})