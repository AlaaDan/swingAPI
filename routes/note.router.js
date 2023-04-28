const { Router } = require('express')
const router = Router()
const uuid = require('uuid-random')
const { hashPass, comparePass } = require("../bcrypt")
const { insertUser, findUser } = require('../model/user')
const jwt = require('jsonwebtoken')
const {checkToken} = require('../middleware/notes.middlware')


router.get('/notes', (req, res)=>{

})

router.post('/notes', (req, res)=>{
    
})

router.put('/notes', (req, res)=>{
    
})

router.delete('/notes', (req, res)=>{
    
})

router.post('/user/signup', async (req, res)=>{
    const { username, password } = req.body

    const pass = await hashPass(password)

    insertUser(username, pass)

    res.json({success: true})

    
})

router.post('/user/login', async (req, res)=>{
    const { username, password } = req.body

    const user = await findUser(username)
    console.log(user)
    const correctPass = await comparePass(password, user.password)
    console.log(correctPass)
    resutl = {
        success: false
    }
    if(correctPass){
        const token = jwt.sign({id: user.id}, 'a1b1c1', {expiresIn: 600,});
        resutl.success = true
        resutl.token = token
    }else {
        resutl.messsage = "Incorrect login information"
    }

    res.json(resutl)
})

router.get('/notes/search', checkToken, (req, res)=>{
    res.json("Correct token")
})


module.exports = router