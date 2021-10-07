const express = require('express')
const Router = require('./Routes/routes')

const app = express()
app.use(express.json())
app.use('/user',Router)

app.listen(5000,()=>console.log('Listening to the port..'))

