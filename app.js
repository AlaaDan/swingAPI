const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const noteRouter = require('./routes/note.router')

app.use(express.json())

app.use('/api', noteRouter )


app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`)
})