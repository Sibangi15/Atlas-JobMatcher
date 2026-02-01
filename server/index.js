const connectToMongo = require('./config/db');
connectToMongo();

// var cors = require('cors')

// app.use(cors())
// app.use(express.json())

// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`JobMatcher listening on port ${port}`)
})