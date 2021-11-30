const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require('dotenv/config')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadCtrl = {
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;
            
            cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath)
                
                res.json({url: result.secure_url})
            })
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}
module.exports = uploadCtrl;