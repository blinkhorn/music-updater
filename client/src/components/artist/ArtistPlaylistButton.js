import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { spotifyID, spotifyState } from '../../config.json';
import { updateCurrentArtist } from '../../actions/artist';
// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';
const ArtistPlaylistButton = ({ artistId, updateCurrentArtist }) => {
  const redirectURI = encodeURIComponent(
    'http://localhost:3000/artist/playlist' // make localhost part more versatile with env vars
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    updateCurrentArtist(artistId);
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyID}&response_type=code&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email&state=${spotifyState}`;
  };
  return (
    <Card className='artist-form-card'>
      <CardContent>
        <div>
          <h3>Generate a Spotify playlist with these releases!</h3>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            type='submit'
          >
            Create Playlist
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

ArtistPlaylistButton.propTypes = {
  updateCurrentArtist: PropTypes.func.isRequired,
  artistId: PropTypes.string.isRequired
};

export default connect(null, { updateCurrentArtist })(
  ArtistPlaylistButton
);
