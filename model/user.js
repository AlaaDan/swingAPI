const nedb = require('nedb-promises')
const userDB = new  nedb({ filename: 'user.db', autoload: true})
const uuid = require('uuid-random')


function insertUser(user, pass){
    userDB.insert({username: user, password: pass, id: uuid()})
}

async function findUser(username){
    return await userDB.findOne({username: username})
}

module.exports = {insertUser, findUser}