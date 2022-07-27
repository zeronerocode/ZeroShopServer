const multer = require("multer");
const path = require("path");

// const { CloudinaryStorage } = require("multer-storage-cloudinary");


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "ankasa",
//   },
// });
// exports.upload = multer({
//   storage: multer.diskStorage({}),
// })

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 2097152 },
  fileFilter: function (req, file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("jpg & png only"));
    }
  },
});

module.exports = upload;