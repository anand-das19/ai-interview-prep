const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
            return callback(null, true)
        }
        callback(new Error('Only PDF resume files are supported.'))
    },
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
})


module.exports = upload
