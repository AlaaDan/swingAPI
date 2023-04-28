const jwt = require('jsonwebtoken')

function checkToken(req, res, next){
    const token = req.headers.auth.replace('Bearer ', '')

    try{
        const data = jwt.verify(token, 'a1b1c1')
        console.log(data)
        next()
    } catch (error){
        res.json({sucess: false, error: "Invalid token"})
    }
}


module.exports = {checkToken}