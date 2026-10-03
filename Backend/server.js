require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const PORT = process.env.PORT || 3000

async function startServer() {
    // Start listening immediately so Render's /health check succeeds right away
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`)
    })

    try {
        await connectToDB()
    } catch (error) {
        console.error('Database connection failed on startup:', error.message)
    }
}

startServer()
