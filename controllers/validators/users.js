const Joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userValidators = {
    createUser: Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(9).required(),
        password: JoiPassword.string.min(5).noWhiteSpaces().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        job: Joi.string().min(3).required(),
        experience: Joi.number(1).required(),
        skills: Joi.array().items(Joi.string()),

        if(err) {
            console.log(err)
        }
    })
}

module.exports = userValidators