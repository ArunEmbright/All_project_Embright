const express = require('express');


const storage = require('../storages/storage');
const Profile = require('../model/profile');
const router = express.Router();

router.get('/', async (req, res) => {
    const profiles = await Profile.find();
    res.status(200).json({ profiles });
  });

router.post('/', storage, async (req, res) => {
   const image = 'http://localhost:3000/images/' + req.file.filename;
    const profile = new Profile({
      
      image
      
    });
    const createdProfile = await profile.save();
    res.status(201).json({
      profile: { 
        ...createdProfile._doc,
      },
    });
  });

  router.delete('/', async (req, res)=>{
    const profiles = await Profile.remove();
    res.status(200).json({profiles})
  })
module.exports = router;