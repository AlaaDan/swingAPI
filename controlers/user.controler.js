const {userDb, notesDB} = require('../model/user')
const { insertUser, findUser, createNote, getNotesByUserId, isUser, changeNote } = require('../model/user')
const { hashPass, comparePass } = require("../bcrypt")
const jwt = require('jsonwebtoken')
const { not } = require('joi')

async function login(req, res){
    const { username, password } = req.body

    const user = await findUser(username)
    if (user){
        const correctPass = await comparePass(password, user.password)
        console.log(correctPass)
        if(correctPass){
            const token = jwt.sign({id: user.id}, 'a1b1c1', {expiresIn: 600,});
            res.status(200).json({success: true, userID: user.id, token: token})
        }else {
            res.status(400).json({success: false, message: "Incorrect password!"})
        }
    }else {
        res.status(404).json({success: false, message: "Incorrect username!"}) 
    }
}

async function createUser (req, res){
    const { username, password } = req.body
    const pass = await hashPass(password)

    insertUser(username, pass)
    res.status(200).json({success: true})
  
}

async function addNote(req, res){
    const {title, text, userID } = req.body
    const note = await createNote(title, text, userID)
    console.log(note)

    // try{

    // }
    res.status(200).json({sucess: true, note: note})

}

async function getNotes(req, res){
    try{
        const {userID} = req.body
        const user = await isUser(userID)
        console.log(user)
        const userNotes = await getNotesByUserId(userID)
        //console.log(notes)
        const frontEndNotes = userNotes.map(eachNote =>{
            return {
                    NoteId: eachNote.noteID, 
                    UserID: eachNote.userID, 
                    NoteTitle: eachNote.title, 
                    NoteText: eachNote.text, 
                    CreatedAt: eachNote.createdAT, 
                    ModifiedAt: eachNote.modifiedAt}
            })
        res.status(200).json({sucess: true, Notes: frontEndNotes.length == 0 ? "You don't have any notes" : frontEndNotes})
    } catch (error) {
        res.status(500).json({sucees: false, msg: error.message})
    }    
}
async function editNote(req, res){
    try{
        const {userID, title, newNote} = req.body
        const user = await isUser(userID)
        console.log(user)
        const updatedNote = await changeNote(title, newNote)

        res.status(200).json({success: true, updatedNote: updatedNote})

    } catch (error){
    res.status(404).json({sccuess: false, msg: "Wrong title/Title not found!"})
    }
}

module.exports = {login, createUser, addNote, getNotes, editNote}