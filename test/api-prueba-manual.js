import supertest from "supertest"

//Test del servidor de forma externa con supertest
const pruebaServidorConSuperTest = async () => {
    const url = 'http://localhost:8080/api/clinica/pacientes/buscarPacientePorId'

    try {
        const request = supertest(url)

        const { body, status } = await request.get('/1')
        console.log('status code', status)
        console.log('body', body)
    }
    catch (error) {
        console.log('error', error.message)
    }
}

pruebaServidorConSuperTest()
