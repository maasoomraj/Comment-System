const mongoose = require('mongoose')

dbConnect = () => mongoose.connect(
    'mongodb+srv://masoom:DIVERTAmasoom2020@cluster0.eqdpf.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)

module.exports = { dbConnect }