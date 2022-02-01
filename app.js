import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from "./src/router/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./src/middlewares/error-middleware.js";

dotenv.config()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL
const app = express()
app.set('trust proxy', 1);
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL, 'Access-Control-Allow-Origin': '*',
}))

app.use('/api', router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send().json({sadas: "asfafas"})
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()


