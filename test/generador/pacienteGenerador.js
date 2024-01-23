import { faker } from '@faker-js/faker/locale/es'

const get = _ => ({
    //nombre: faker.person.fullName(),
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    edad: faker.number.int({ min: 1, max: 100 }),
    email: faker.internet.email()
})

//console.log(get())

export default {
    get
}