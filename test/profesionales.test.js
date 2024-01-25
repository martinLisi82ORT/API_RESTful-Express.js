import { expect } from 'chai'
import generador from './generador/profesionalGenerador.js'

describe('**** Test del generador de Profesional ****', () => {
    
    it('el profesional debe contener los campos nombre, apellido, edad y email', () => {
       const profesional = generador.get()

       expect(profesional).to.include.keys('nombre', 'apellido','edad','email')
    })

    it('deberia generar profesionales aleatorios', () => {
        const profesional1 = generador.get()
        const profesional2 = generador.get()

        expect(profesional1.nombre).not.to.eql(profesional2.nombre)
        expect(profesional1.apellido).not.to.eql(profesional2.apellido)
        expect(profesional1.edad).not.to.eql(profesional2.edad)
        expect(profesional1.email).not.to.eql(profesional2.email)
    })
    
})