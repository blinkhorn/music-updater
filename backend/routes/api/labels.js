const express = require('express');
const axios = require('axios');
const config = require('config');
const key = config.get('discogsKey');
const secret = config.get('discogsSecret');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Label = require('../../models/Label');

const getMorePages = (name, currentPage) => {
  return axios
    .get(
      `https://api.discogs.com/database/search?label=${name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
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

const setLabelRelease = (user, release) => {
  return {
    user,
    releaseId: release.id,
    resourceURL: release.resource_url,
    thumbnailURL: release.thumb,
    releaseTitle: release.title,
    releaseYear: release.year
  };
};

// @route    POST api/labels
// @desc     Create an label
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

      const newLabel = new Label({
        user: req.user.id,
        name: req.body.name
      });

      await axios
        .get(
          `https://api.discogs.com/database/search?label=${req.body.name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
        )
        .then(async (response) => {
          for (let release of response.data.results) {
            newLabel.releases.unshift(
              setLabelRelease(req.user.id, release)
            );
          }
          currentPage++; // increment before check if need to get more pages
          while (currentPage <= response.data.pagination.pages) {
            for (let release of await getMorePages(
              req.body.name,
              currentPage
            )) {
              newLabel.releases.unshift(
                setLabelRelease(req.user.id, req.body.name, release)
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

      const label = await newLabel.save();

      res.json(label);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/labels
// @desc     Get all labels for current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const currentUserLabels = await Label.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(currentUserLabels);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/labels/all
// @desc     Get all labels for all users
// @access   Private
router.get('/all', auth, async (req, res) => {
  try {
    const labels = await Label.find().sort({
      date: -1
    });
    res.json(labels);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/labels/:id
// @desc     Get label by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    if (!label) {
      return res.status(404).json({ msg: 'Label not found' });
    }

    // check user
    if (label.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(label);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Label not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/labels/:id
// @desc     Delete a label
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);

    if (!label) {
      return res.status(404).json({ msg: 'Label not found' });
    }

    // check user
    if (label.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await label.remove();

    res.json({ msg: 'Label removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Label not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/labels/releases/:id
// @desc     Update a label's releases
// @access   Private
router.put('/releases/:id', auth, async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);

    if (!label) {
      return res.status(404).json({ msg: 'Label not found' });
    }

    // check user
    if (label.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const currentLabelReleases = [...label.releases];

    const updatedLabelReleases = [];

    let currentPage = 1;

    await axios
      .get(
        `https://api.discogs.com/database/search?label=${label.name}&per_page=100&page=${currentPage}&key=${key}&secret=${secret}`
      )
      .then(async (response) => {
        for (let release of response.data.results) {
          updatedLabelReleases.unshift(
            setLabelRelease(req.user.id, label.name, release)
          );
        }
        currentPage++; // increment before check if need to get more pages
        while (currentPage <= response.data.pagination.pages) {
          for (let release of await getMorePages(label.name, currentPage)) {
            updatedLabelReleases.unshift(
              setLabelRelease(req.user.id, label.name, release)
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
    if (currentLabelReleases.length !== updatedLabelReleases.length) {
      label.releases = updatedLabelReleases;
      await label.save();
      res.json({ msg: 'Label releases updated' });
    } else {
      res.json({ msg: 'No new label releases' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/labels/release/:id/:release_id
// @desc     Delete Label release
// @access   Private
router.delete('/release/:id/:release_id', auth, async (req, res) => {
  try {
      const label = await Label.findById(req.params.id);

      // pull out release
      const release = label.releases.find(
          release => release.id === req.params.release_id
      );

      // make sure label exists
      if (!label) {
          return res.status(404).json({ msg: 'Label does not exits' });
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
      const removeIndex = label.releases
          .map(release => release.id)
          .indexOf(req.params.release_id);

      label.releases.splice(removeIndex, 1);

      await label.save();

      res.json(label.releases);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
