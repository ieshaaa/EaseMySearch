// var multer= require("multer");

// var serverpath =multer.diskStorage({
//     destination: (req,file,path) =>{
//         path(null,"public/images");
//     },
//     filename:(req,file,path) =>{
//         path(null,file.originalname);
//     },
// });

// var upload=multer({storage:serverpath});

// module.exports=upload;

// multer.js
require('dotenv').config();
var multer = require("multer");
var cloudinary = require("cloudinary").v2;
var { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloudinary-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-cloudinary-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-cloudinary-api-secret'
});

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flght-enquiry-images",
    format: async (req, file) => {
        // Determine the format based on the file type
        const fileTypes = {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          // Add more file types if needed
        };
        const format = fileTypes[file.mimetype];
        return format || 'png'; // Default to 'png' if the file type is not recognized
      },    public_id: (req, file) => `${file.fieldname}-${Date.now()}`
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
