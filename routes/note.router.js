const { Router } = require('express')
const router = Router()
const {checkToken, validateUserInfo, validateNotesInfo, validateUserId, checkIfUser} = require('../middleware/notes.middlware')
const {login, createUser, addNote, getNotes} = require('../controlers/user.controler')

router.get('/notes', checkToken, validateUserId, checkIfUser, getNotes)

router.post('/notes', checkToken, validateNotesInfo, addNote)

router.put('/notes', (req, res)=>{
    
})

router.delete('/notes', (req, res)=>{
    
})

router.post('/user/signup', validateUserInfo, createUser)

router.post('/user/login', validateUserInfo, login)

router.get('/notes/search/title:', checkToken, (req, res)=>{
    res.json("Correct token")

    // Should search for the title 
})


module.exports = router