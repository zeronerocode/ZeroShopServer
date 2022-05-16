const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix + '-'+ file.originalname)
      },
  })
  
  const upload = multer({ 
      storage: storage,
      limits : {fileSize : 2097152},
      fileFilter: function (req, file, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png/;
        // Check ext
        const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        
        if(mimetype && extname){
            return cb(null,true);
        } else {
            cb(new Error('jpg & png only'));
        }
    }, 
})

  module.exports = upload