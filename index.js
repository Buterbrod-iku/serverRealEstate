require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

// catch error
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'sadasdasd'})
})


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server work on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()