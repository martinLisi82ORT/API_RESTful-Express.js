import nodemailer from 'nodemailer'

class ServicioEmail {
    constructor() {
        this.transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: 'true',
            auth: {
                user: 'ortspital@gmail.com',
                pass: 'gtlrdmsmvjagnjir'
            },
            tls: { rejectUnauthorized: false }
        })
    }

    async mandarEmail(contextoEmail) { /*contextoEmail tiene que ser un objeto con: from (quien manda el mail, siempre es ortspital@gmail.com),
    to (quien recibe el mail, el paciente logeado), subject (el titulo o sujeto del mail), y text (el cuerpo o texto del mail) */
        try {
            const info = await this.transport.sendMail(contextoEmail)
            return info
        } catch (error) {
            throw error;
        }
    }

}

export default ServicioEmail