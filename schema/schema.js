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
        title: Joi.string().min(1).max(50).required(),
        text: Joi.string().min(1).max(300).required()
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
        title: Joi.string().min(1).max(50).required(),
        newNote: Joi.string().min(1).max(300).required() 
    })
    return schema.validate(info)
}

function schemaDeleteNote(noteTitle){
    const schema = Joi.object({
        userID: Joi.string().required(),
        title: Joi.string().min(1).max(50).required()
    })
    return schema.validate(noteTitle)
}

module.exports = { userSchemaChecker, noteSchemaChecker, checkUserId, checkEditeNote, schemaDeleteNote}