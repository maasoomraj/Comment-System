const express = require('express')
const { dbConnect } = require('./Utils/database')
const Comment = require('./Routes/Comment')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express()
app.use(express.json())
app.use(Comment)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3001
app.listen(PORT, () => {
    dbConnect()
    console.log(`Listening at port ${PORT}`)
})