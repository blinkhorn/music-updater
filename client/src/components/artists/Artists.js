import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtistItem from './ArtistItem';
import ArtistForm from './ArtistForm';
import { getCurrentUserArtists } from '../../actions/artist';

// Material
import Grid from '@material-ui/core/Grid';

// CSS
import '../../App.css';

const Artists = ({
  getCurrentUserArtists,
  auth,
  artist: { artists, loading }
}) => {
  useEffect(() => {
    getCurrentUserArtists();
  }, [getCurrentUserArtists]);

  return loading ? (
    <div></div>
  ) : (
    <Fragment>
      <h1>Artists</h1>
      <p>Welcome to Music Updater!</p>
      <div className='artist-container'>
        <ArtistForm />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          {artists
            .filter((artist) => !auth.loading && artist.user === auth.user._id)
            .map((artist) => (
              <Grid key={artist._id} item>
                <ArtistItem key={artist._id} artist={artist} />
              </Grid>
            ))}
        </Grid>
      </div>
    </Fragment>
  );
};

Artists.propTypes = {
  getCurrentUserArtists: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  artist: state.artist,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUserArtists })(Artists);
