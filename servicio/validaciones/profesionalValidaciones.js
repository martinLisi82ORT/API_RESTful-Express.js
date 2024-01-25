import Joi from 'joi'

export const validar = profesional => {
    const profesionalSchema = Joi.object({
        nombre: Joi.string().min(2).max(30).required(),
        apellido: Joi.string().min(2).max(30).required(),
        edad: Joi.number().min(0).max(100).required(),
        rol: Joi.required().valid('Profesional'),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        especialidad: Joi.string().alphanum().min(3).max(50).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })

    const { error } = profesionalSchema.validate(profesional)
    if (error) {
        return { result: false, error }
    }
    return { result: true }
}
