const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const noteRouter = require('./routes/note.router')

const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')


app.use(express.json())

app.use('/api/docs', swaggerUI.serve)
app.get('/api/docs', swaggerUI.setup(apiDocs))

app.use('/api', noteRouter )


app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`)
})