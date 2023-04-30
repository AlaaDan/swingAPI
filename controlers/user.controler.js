const { insertUser, findUser, createNote, getNotesByUserId, isUser, changeNote, deleteNoteFromDB, searchForNote } = require('../model/user')
const { hashPass, comparePass } = require("../bcrypt")
const jwt = require('jsonwebtoken')
const { not } = require('joi')

async function login(req, res){
    const { username, password } = req.body

    const user = await findUser(username)
    if (user){
        const correctPass = await comparePass(password, user.password)
        //console.log(correctPass)
        if(correctPass){
            const token = jwt.sign({id: user.id}, 'a1b1c1', {expiresIn: 2600,});
            res.status(200).json({Success: true, userID: user.id, token: token})
        }else {
            res.status(400).json({Success: false, message: "Incorrect password!"})
        }
    }else {
        res.status(404).json({Success: false, message: "Incorrect username!"}) 
    }
}

async function createUser (req, res){
    try {
        const { username, password } = req.body
        const pass = await hashPass(password)

        insertUser(username, pass)
        res.status(200).json({
            Success: true,
            message: `The user [${username}] has been successfully created`,
            instruction: "Please login to get your userID and a token to be ba able to use the application"
        })
    } catch (error){
        res.status(500).json({Success: false, message: error.message})
    }
  
}

async function addNote(req, res){
    try{
        const {title, text, userID } = req.body
        const note = await createNote(title, text, userID)
        //console.log(note)
        res.status(200).json({
            Success: true, 
            Message: "The note has been successfully added to the database",
            NoteInfo: {
                NoteId: note.noteID,
                Title: note.title,
                Text: note.text,
                CreatedAT: note.createdAT
            }})

    } catch (error){
        res.status(500).json({sccuess: false, error: error.message})
    }

}

async function getNotes(req, res){
    try{
        const {userID} = req.body
        const user = await isUser(userID)
        //console.log(user)
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
        res.status(200).json({
            sucess: true, 
            Notes: frontEndNotes.length == 0 ? "You don't have any notes" : frontEndNotes})
    } catch (error) {
        res.status(500).json({sucees: false, message: error.message})
    }    
}
async function editNote(req, res){
    try{
        const {userID, title, newNote} = req.body
        const user = await isUser(userID)
        //console.log(user)
        const updatedNote = await changeNote(title, newNote)

        res.status(200).json({success: true, updatedNote: {
            Title: updatedNote.title,
            Text: updatedNote.text,
            CreatedAT: updatedNote.createdAT,
            ModifiedAt: new Date()
        }})

    } catch (error){
        //console.log(error)
    res.status(404).json({
        sccuess: false, 
        error: error.message,
        message: "Wrong title or Title not found!"})
    }
}


async function deleteNote(req, res){
    try{
        // const { userID, title} = req.body
        // const user = await isUser(userID)
        const noteID = req.params.noteID
        //console.log(noteID)
        const note = await deleteNoteFromDB(noteID)
        res.status(200).json({
            sccuess: true, 
            Message: `The Note with the following ID [${noteID}] has been deleted from the database`,
            
        })
        
    } catch (error){
        res.status(404).json({
            success: false, 
            error: error.message,
            message: "The Note ID doesn't exist"
        })
    }
}

async function getNoteByTitle(req, res){
    try{
       const note =  await searchForNote(req.params.title)
       console.log(note)
       res.status(200).json({
            Success: true, 
            Title: note.title, 
            Note: note.text
        })

    } catch (error){
        res.status(404).json({Success: false, message: "No such title"})
    }
   
}

module.exports = {login, createUser, addNote, getNotes, editNote, deleteNote, getNoteByTitle}