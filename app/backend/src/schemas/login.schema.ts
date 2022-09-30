import* as Joi from 'joi'

const InputLogin = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': '400|All fields must be filled',
    'string.required': '400|All fields must be filled'
  }),
  password: Joi.string()
})

export default InputLogin;
