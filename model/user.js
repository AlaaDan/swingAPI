const nedb = require('nedb-promises')
const userDB = new  nedb({ filename: 'userDB.db', autoload: true})
const notesDB = new  nedb({ filename: 'notesDB.db', autoload: true})
const uuid = require('uuid-random')


function insertUser(user, pass){
    userDB.insert({username: user, password: pass, id: uuid()})
}

async function findUser(username){
    return await userDB.findOne({username: username})
}

async function createNote(title, text, userID){
    const note = {
        userID: userID,
        noteID: uuid(),
        title: title,
        text: text,
        createdAT: new Date(),
        modifiedAt: ""
    }

    return await notesDB.insert(note)
}

async function getNotesByUserId(userID){
    return await notesDB.find({userID})
}

async function isUser(userId){
    return await userDB.findOne({id: userId})

}

async function changeNote(title, newNote){
    const getNoteInfo = await notesDB.findOne({title})
    //console.log(getNoteInfo)
    await notesDB.update(
        {text: getNoteInfo.text},
        {$set: {text: newNote, modifiedAt: new Date()}}
        )
    return await notesDB.findOne({title})

}


async function deleteNoteFromDB(noteID){
    const isNote = await notesDB.findOne({noteID: noteID})
    //console.log(isNote)
    return await notesDB.remove({title: isNote.title})

}


async function searchForNote(noteTitle){
    return await notesDB.findOne({title: noteTitle})
}
module.exports = {insertUser, findUser, createNote, getNotesByUserId, isUser, changeNote, deleteNoteFromDB, searchForNote}