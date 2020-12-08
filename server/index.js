const express = require('express')
// const middleware = require('./Routes/index')
const { dbConnect } = require('./Utils/database')

const Comment = require('./Routes/Comment')

const app = express()
app.use(express.json())
app.use(Comment)
// app.use(middleware)

const PORT = 3001
app.listen(PORT, () => {
    dbConnect()
    console.log(`Listening at port ${PORT}`)
})