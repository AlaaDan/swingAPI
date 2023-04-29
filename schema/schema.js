const Joi = require('joi')

function userSchemaChecker(userInfo){
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(userInfo)
}

function noteSchemaChecker(noteInfo){
    const schema = Joi.object({
        userID: Joi.string().required(),
        title: Joi.string().max(50).required(),
        text: Joi.string().max(300).required()
    })
    return schema.validate(noteInfo)
}

function checkUserId(userID){
    const schema = Joi.object({
        userID: Joi.string().required()
    })
    return schema.validate(userID)
}

function checkEditeNote(info){
    const schema = Joi.object({
        userID: Joi.string().required(),
        title: Joi.string().max(50).required(),
        newNote: Joi.string().max(300).required() 
    })
    return schema.validate(info)
}

module.exports = { userSchemaChecker, noteSchemaChecker, checkUserId, checkEditeNote}