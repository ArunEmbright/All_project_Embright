var express = require('express');
var router = express.Router();
const { Team } = require('../model/team.model');
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



router.post('/team',authenticate,(req, res) => {
    // img='http://localhost:3000/images/' + req.file.filename;

    let exhibitor = req.body.exhibitor;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let designation = req.body.designation;
    //   let img=img;

    let newList = new Team({
        exhibitor,
        firstName,
        lastName,
        email,
        phoneNumber,
        designation,
        //    img,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
})

router.get('/listTeam',authenticate, (req, res) => {
    Team.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e)
    });
}).patch('/listTeam/:id', upload.single('img'), authenticate, (req, res) => {
    // img='http://localhost:3000/images/' + req.file.filename;
    Team.findByIdAndUpdate({
        _id: req.params.id, _userId: req.user_id,
    }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'Updated successfully' });
    })
}).delete('/listTeam/:id', authenticate, (req, res) => {
    Team.findByIdAndRemove({
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
    Team.findOne({ _id: req.params.id, _userId: req.user_id })
        .then(function (list) {
            res.send(list)
        });
});

module.exports = router;
