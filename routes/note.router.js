const { Router } = require('express')
const router = Router()
const {checkToken, validateUserInfo, validateNotesInfo, validateUserId, checkIfUser, validateEditeInfo, validateDeleteInfo} = require('../middleware/notes.middlware')
const {login, createUser, addNote, getNotes, editNote, deleteNote, getNoteByTitle} = require('../controlers/user.controler')

router.get('/notes', checkToken, validateUserId, checkIfUser, getNotes)

router.post('/notes', checkToken, validateNotesInfo,checkIfUser, addNote)

router.put('/notes',checkToken,validateEditeInfo,checkIfUser, editNote)

router.delete('/notes/:noteID', checkToken, deleteNote)

router.post('/user/signup', validateUserInfo, createUser)

router.post('/user/login', validateUserInfo, login)

router.get('/notes/search/:title', checkToken, getNoteByTitle)


module.exports = router