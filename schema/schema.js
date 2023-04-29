const joi = require('joi')

function userSchemaChecker(userInfo){
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
    })
    return schema.validate(userInfo)
}

function noteSchemaChecker(noteInfo){
    const schema = joi.object({
        userID: joi.string().required(),
        title: joi.string().max(50).required(),
        text: joi.string().max(300).required()
    })
    return schema.validate(noteInfo)
}

function checkUserId(userID){
    const schema = joi.object({
        userID: joi.string().required()
    })
    return schema.validate(userID)
}

module.exports = { userSchemaChecker, noteSchemaChecker, checkUserId}