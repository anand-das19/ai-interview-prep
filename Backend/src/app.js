const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', 1)

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173']

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// Keep API errors predictable for the frontend and deployment health checks.
app.use((err, req, res, next) => {
    console.error(err)

    if (err.name === 'MulterError') {
        return res.status(400).json({ message: `Upload error: ${err.message}` })
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid resource id.' })
    }

    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong. Please try again.'
    })
})


module.exports = app
