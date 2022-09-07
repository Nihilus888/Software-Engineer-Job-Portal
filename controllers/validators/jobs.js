const Joi = require('joi')

const jobValidators = {
    createJobs: Joi.object({
        title: Joi.string().min(6).required(),
        salary_min: Joi.number().min(3),
        salary_max: Joi.number().max(8),
        currency: Joi.string().min(4).required(),
        tech_stacks: Joi.string().min(5).required(),
        position: Joi.string().min(4).required(),
        company: Joi.string().required(),
        experience: Joi.number(),

        if(err) {
            console.log(err)
        }
    })
}

module.exports = jobValidators