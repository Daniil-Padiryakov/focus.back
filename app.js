require('dotenv').config()
const express = require('express')
const router = require('./src/router/index.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddleware = require('./src/middlewares/error-middleware.js')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL, 'Access-Control-Allow-Origin': '*',
}))
app.use(express.json())

app.use('/api', router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send().json({sadas: "asfafas"})
})

async function startApp() {
    try {
        if (process.env.NODE_ENV === 'test') {
            return app.listen(6000, () => console.log(PORT))
        }
        return app.listen(PORT, () => console.log(PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()

module.exports = app
