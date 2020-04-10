const express = require('express');
const axios = require('axios');
const config = require('config');
const key = config.get('discogsKey');
const secret = config.get('discogsSecret');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Artist = require('../../models/Artist');

const getMorePages = (name, currentPage) => {
  return axios
    .get(
      `https://api.discogs.com/database/search?artist=${name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
    )
    .then((res) => res.data.results)
    .catch((err) => {
      console.error(err.message);
      res
        .status(500)
        .send(
          "Server Error | We're experiencing issues retrieving data from Discogs."
        );
    });
};

const setArtistRelease = (user, artist, release) => {
  return {
    user: user,
    artist: artist,
    releaseId: release.id,
    resourceURL: release.resource_url,
    thumbnailURL: release.thumb,
    releaseTitle: release.title,
    releaseLabel: release.label,
    releaseType: release.type,
    releaseYear: release.year
  };
};

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
      let currentPage = 1;

      const newArtist = new Artist({
        user: req.user.id,
        name: req.body.name
      });

      await axios
        .get(
          `https://api.discogs.com/database/search?artist=${req.body.name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
        )
        .then(async (response) => {
          for (let release of response.data.results) {
            newArtist.releases.unshift(
              setArtistRelease(req.user.id, req.body.name, release)
            );
          }
          currentPage++; // increment before check if need to get more pages
          while (currentPage <= response.data.pagination.pages) {
            for (let release of await getMorePages(
              req.body.name,
              currentPage
            )) {
              newArtist.releases.unshift(
                setArtistRelease(req.user.id, req.body.name, release)
              );
            }
            currentPage++;
          }
        })
        .catch((err) => {
          console.error(err.message);
          res
            .status(500)
            .send(
              "Server Error | We're experiencing issues retrieving data from Discogs."
            );
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
