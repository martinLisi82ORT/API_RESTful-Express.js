import Joi from 'joi'

export const validar = profesional => {
    const profesionalSchema = Joi.object({
        nombre: Joi.string().min(2).max(30).required(),
        apellido: Joi.string().min(2).max(30).required(),
        especialidad: Joi.string().alphanum().min(3).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })

    const { error } = profesionalSchema.validate(profesional)
    if (error) {
        return { result: false, error }
    }
    return { result: true }
}
