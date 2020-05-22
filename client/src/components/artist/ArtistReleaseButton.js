import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateArtistReleases } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistReleaseButton = ({ artistId, updateArtistReleases }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    updateArtistReleases(artistId);
  };

  return (
    <Card className='artist-form-card' style={{ marginBottom: '4rem' }}>
      <CardContent>
        <div>
          <h3>Update the artist releases</h3>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            type='submit'
          >
            Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

ArtistReleaseButton.propTypes = {
  artistId: PropTypes.string.isRequired,
  updateArtistReleases: PropTypes.func.isRequired
};

export default connect(null, { updateArtistReleases })(ArtistReleaseButton);
