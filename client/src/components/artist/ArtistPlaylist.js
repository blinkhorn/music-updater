import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentArtist } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';

// CSS
import '../../App.css';

const ArtistPlaylist = ({
  getCurrentArtist,
  artist: { currentArtist, loading }
}) => {
  useEffect(() => {
    getCurrentArtist();
  }, [getCurrentArtist]);

  const code = window.location.search.split('=')[1].slice(0, -6);
  return loading ? (
    <div />
  ) : (
    <Fragment>
      <div className='artist-container'>
        <h1>Check Your Spotify! </h1>
        <p>
          We generated a playlist with releases for you from{' '}
          {currentArtist.name}
        </p>
      </div>
      <Button variant='contained' style={{ marginTop: '1rem' }}>
        <Link style={{ color: 'black', textDecoration: 'none' }} to='/artists'>
          Back To Artists
        </Link>
      </Button>
    </Fragment>
  );
};

ArtistPlaylist.propTypes = {
  getCurrentArtist: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps, { getCurrentArtist })(ArtistPlaylist);
