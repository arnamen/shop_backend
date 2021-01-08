const multer = require('multer');
const {v4} = require('uuid');
const path = require('path');
const fs = require('fs');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = './uploads/items/' + req.params.id + '/images/';
      if(!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true});
      cb(null, path);
    },
    filename: (req, file, cb) => {

      //remove file extension and path-restricted simbols
      const itemId = file.originalname.replace(/((\.jpe?g)|(\.png))$/gm,'').replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!/gm, '.');
      const ext = MIME_TYPE_MAP[file.mimetype];

      cb(null, itemId + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
