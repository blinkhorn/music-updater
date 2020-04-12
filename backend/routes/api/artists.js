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
    user,
    artist,
    releaseId: release.id,
    resourceURL: release.resource_url,
    thumbnailURL: release.thumb,
    releaseTitle: release.title,
    releaseLabels: release.label,
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

// @route    GET api/artists
// @desc     Get all artists for current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const currentUserArtists = await Artist.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(currentUserArtists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/artists/all
// @desc     Get all artists for all users
// @access   Private
router.get('/all', auth, async (req, res) => {
  try {
    const artists = await Artist.find().sort({
      date: -1
    });
    res.json(artists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/artists/:id
// @desc     Get artist by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ msg: 'Artist not found' });
    }

    // check user
    if (artist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(artist);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Artist not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/artists/:id
// @desc     Delete an artist
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ msg: 'Artist not found' });
    }

    // check user
    if (artist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await artist.remove();

    res.json({ msg: 'Artist removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Artist not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/artists/releases/:id
// @desc     Update an artist's releases
// @access   Private
router.put('/releases/:id', auth, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ msg: 'Artist not found' });
    }

    // check user
    if (artist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const currentArtistReleases = [...artist.releases];

    const updatedArtistReleases = [];

    let currentPage = 1;

    await axios
      .get(
        `https://api.discogs.com/database/search?artist=${artist.name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
      )
      .then(async (response) => {
        for (let release of response.data.results) {
          updatedArtistReleases.unshift(
            setArtistRelease(req.user.id, artist.name, release)
          );
        }
        currentPage++; // increment before check if need to get more pages
        while (currentPage <= response.data.pagination.pages) {
          for (let release of await getMorePages(artist.name, currentPage)) {
            updatedArtistReleases.unshift(
              setArtistRelease(req.user.id, artist.name, release)
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
    if (currentArtistReleases.length !== updatedArtistReleases.length) {
      artist.releases = updatedArtistReleases;
      await artist.save();
      res.json({ msg: 'Artist releases updated' });
    } else {
      res.json({ msg: 'No new artist releases' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/artists/release/:id/:release_id
// @desc     Delete Artist release
// @access   Private
router.delete('/release/:id/:release_id', auth, async (req, res) => {
  try {
      const artist = await Artist.findById(req.params.id);

      // pull out release
      const release = artist.releases.find(
          release => release.id === req.params.release_id
      );

      // make sure artist exists
      if (!artist) {
          return res.status(404).json({ msg: 'Artist does not exits' });
      }
      // make sure release exists
      if (!release) {
          return res.status(404).json({ msg: 'Release does not exits' });
      }
      // check user
      if (release.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get remove index
      const removeIndex = artist.releases
          .map(release => release.id)
          .indexOf(req.params.release_id);

      artist.releases.splice(removeIndex, 1);

      await artist.save();

      res.json(artist.releases);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
