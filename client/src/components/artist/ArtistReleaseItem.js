import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteArtistRelease } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistReleaseItem = ({
  artistId,
  release: {
    _id,
    user,
    artist,
    releaseTitle,
    thumbnailURL,
    releaseLabels,
    releaseType,
    releaseYear,
    dateRetrieved
  },
  auth,
  deleteArtistRelease
}) => (
  <div className='flip-container'>
    <div className='flipper'>
      <div className='front'>
        <Card>
          <CardContent>
            <h3>{releaseTitle}</h3>
            <img src={thumbnailURL} alt={`Thumbnail for ${releaseTitle}`} />
            <h4>{releaseYear}</h4>
          </CardContent>
        </Card>
      </div>
      <div className='back'>
        <Card>
          <CardContent>
            <h3>{artist}</h3>
            <h4>{releaseType}</h4>
            <h4>Released by:</h4>
            {releaseLabels.map((label) => (
              <h5 key={Math.random() + _id}>{label}</h5>
            ))}
            <p>
              Last updated on{' '}
              <Moment format='MM/DD/YYYY'>{dateRetrieved}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <Button
                variant='contained'
                color='secondary'
                style={{ marginTop: '0.5rem' }}
                onClick={() => deleteArtistRelease(artistId, _id)}
                type='button'
              >
                Delete
              </Button>
            )}{' '}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

ArtistReleaseItem.propTypes = {
  artistId: PropTypes.string.isRequired,
  release: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteArtistRelease: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteArtistRelease })(
  ArtistReleaseItem
);
