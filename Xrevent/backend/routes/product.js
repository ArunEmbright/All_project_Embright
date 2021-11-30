var express = require('express');
var router = express.Router();
const { Product } = require('../model/products.model');
const { User } = require('../model/user.model')
const jwt = require('jsonwebtoken');
const multer = require('multer');

const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        // cb(null, 'image-' + Date.now() + '.' + filetype);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});




router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');


    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err);
        } else {

            req.user_id = decoded._id;
            next();
        }
    });
}



router.post('/product',authenticate,(req, res) => {
    // img='http://localhost:3000/images/' + req.file.filename;

    let exhibitor = req.body.exhibitor;
    let productName = req.body.productName;
    let pickTags = req.body.pickTags;
    let location = req.body.location;
    let description = req.body.description;
    let productTags = req.body.exhibitorTags;
  

    let newList = new Product({
        exhibitor,
        productName,
        pickTags,
        location,
        description,
        productTags,

        //    img,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
})

router.get('/listProduct',authenticate, (req, res) => {
    Product.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e)
    });
}).patch('/listProduct/:id', upload.single('img'), authenticate, (req, res) => {
    // img='http://localhost:3000/images/' + req.file.filename;
    Product.findByIdAndUpdate({
        _id: req.params.id, _userId: req.user_id,
    }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'Updated successfully' });
    })
}).delete('/listProduct/:id', authenticate, (req, res) => {
    Product.findByIdAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

router.get('/:id', authenticate, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    const id = req.params.id
    Product.findOne({ _id: req.params.id, _userId: req.user_id })
        .then(function (list) {
            res.send(list)
        });
});

module.exports = router;
