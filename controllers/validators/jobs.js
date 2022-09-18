const Joi = require('joi')

const jobValidators = {
    createJobs: Joi.object({
        user: Joi.object(),
        company: Joi.string().required(),
        title: Joi.string().required(),
        position: Joi.string().required(),
        experience: Joi.number(),
        salary_min: Joi.number().min(1000).required(),
        salary_max: Joi.number().required(),
        currency: Joi.string().required(),
        experience: Joi.number(),
        skills: Joi.array().items(Joi.object({
            name: Joi.string()
        })),

        if(err) {
            console.log(err)
        }
    })
}

module.exports = jobValidators