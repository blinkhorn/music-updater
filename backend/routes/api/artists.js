const express = require('express');
const axios = require('axios');
const config = require('config');
const key = config.get('discogsKey');
const secret = config.get('discogsSecret');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Artist = require('../../models/Artist');

// @route    POST api/artists
// @desc     Create an artist
// @access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const artistId = await axios
        .get(
          `https://api.discogs.com/database/search?artist=${req.body.name}&per_page=1&page=1&key=${key}&secret=${secret}`
        )
        .then((response) => response.data.results[0].id)
        .catch((err) => {
          console.error(err.message);
          res.status(500).send('Server Error');
        });
      
      const newArtist = new Artist({
        user: req.user.id,
        name: req.body.name,
        artistId
      });

      const artist = await newArtist.save();

      res.json(artist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
