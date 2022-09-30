import* as Joi from 'joi'

const InputLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': '400|All fields must be filled',
    'string.required': '400|All fields must be filled',
    'string.email':'401|Incorrect email or password'
  }),
  password: Joi.string().required().messages({
    'string.empty': '400|All fields must be filled',
    'string.required': '400|All fields must be filled'
  })
})

export default InputLogin;
