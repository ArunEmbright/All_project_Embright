const multer = require('multer');

const diskSnewtorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/speaker-pic');
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + '.' + fileType;
    cb(null, 'image-' + Date.now() + '.' + fileType);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypesofOne = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypesofOne.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskSnewtorage, fileFilter: fileFilter }).single(
  'image'
);

module.exports = storage;
