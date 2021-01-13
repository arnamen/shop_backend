const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {

      //item id generates in the same way from item name in addItem controller as below
      const itemId = req.params.id || req.body.name.replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!|\s/gm, '_');
      if(!itemId) cb(new Error('You must provide item name or id!'));

      const path = './uploads/items/' + itemId + '/images/';

      if(!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true});
      cb(null, path);
    },
    filename: (req, file, cb) => {

      //remove file extension and path-restricted simbols
      const imageId = file.originalname.replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!/gm, '.')  + "_" + ObjectId();
      file.currentName = imageId;
      const ext = MIME_TYPE_MAP[file.mimetype];

      cb(null, imageId + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
