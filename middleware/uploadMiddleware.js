// /middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for storing files
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create the multer instance with storage configuration
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only CSV files
    const filetypes = /csv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: CSV files only!');
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit the file size (10MB)
});

module.exports = upload;
