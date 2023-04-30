const jwt = require('jsonwebtoken')
const { insertUser, findUser, isUser } = require('../model/user')
const { userSchemaChecker, noteSchemaChecker, checkUserId, checkEditeNote, schemaDeleteNote } = require('../schema/schema')

function checkToken(req, res, next){
    const token = req.headers.auth.replace('Bearer ', '')

    try{
        const data = jwt.verify(token, 'a1b1c1')
        console.log("This is the date",data)
        next()
    } catch (error){
        res.status(400).json({sucess: false, error: "Invalid token"})
    }
}

function validateUserInfo(req, res, next){
    const userInfo = userSchemaChecker(req.body)

    if(userInfo.error) return res.status(400).json({success: false, error: userInfo.error.message})
    next()
}

function validateNotesInfo(req, res, next){
    const notesInfo = noteSchemaChecker(req.body)

    if(notesInfo.error) return res.status(400).json({success: false, error: notesInfo.error.message})
    next()
}

function validateUserId(req, res, next){
    const userID = checkUserId(req.body)

    if(userID.error) return res.status(400).json({sucess: false, error: userID.error.message})
    next()
}

async function checkIfUser(req, res, next){
    const {userID} = req.body
    const user = await isUser(userID)

    if(!user) return res.status(404).json({success: false, error: "No such ID found in DataBase"})
    next()
}

function validateEditeInfo(req, res, next){
    const editInfo = checkEditeNote(req.body)

    if(editInfo.error) return res.status(400).json({sucess: false, error: editInfo.error.message})
    next()
}

function validateDeleteInfo(req, res, next){
    // Alternative if I don't want to use params.
    const deleteInfo = schemaDeleteNote(req.body)

    if(deleteInfo.error) return res.status(400).json({sccuess: false, error: deleteInfo.error.message})
    next()
}

module.exports = {checkToken, validateUserInfo, validateNotesInfo, validateUserId, checkIfUser, validateEditeInfo, validateDeleteInfo }