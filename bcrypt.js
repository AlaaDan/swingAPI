const bcrypt = require('bcryptjs')

async function hashPass(password){
    const hashedPass = await bcrypt.hash(password, 10)

    return hashedPass

}

async function comparePass(password, hashedPass){
    const isSamePass = await bcrypt.compare(password, hashedPass)
 
    return isSamePass
}

module.exports = { hashPass, comparePass }