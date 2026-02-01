const connectToMongo = require('./config/db');
connectToMongo();

// var cors = require('cors')

// app.use(cors())

// app.use('/api/notes', require('./routes/notes'))


const express = require('express')
const app = express()
const port = 3000

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`JobMatcher listening on port ${port}`)
})