const mongoose = require("mongoose")



async function connectToDB() {

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is required.')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.error('Database connection failed:', err)
        throw err
    }
}

module.exports = connectToDB
