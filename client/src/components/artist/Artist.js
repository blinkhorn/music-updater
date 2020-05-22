import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ArtistItem from '../artists/ArtistItem';
import ArtistReleaseButton from './ArtistReleaseButton';
import ArtistReleaseItem from './ArtistReleaseItem';
import { getArtist } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// CSS
import '../../App.css';

const Artist = ({ getArtist, artist: { artist, loading }, match }) => {
  useEffect(() => {
    getArtist(match.params.id);
  }, [getArtist, match]);

  return loading || artist === null ? (
    <div />
  ) : (
    <Fragment>
      <Button variant='contained' style={{ marginTop: '1rem' }}>
        <Link style={{ color: 'black', textDecoration: 'none' }} to='/artists'>
          Back To Artists
        </Link>
      </Button>
      <div className='artist-container'>
        <ArtistItem artist={artist} showActions={false} />
        <ArtistReleaseButton artistId={artist._id} />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          {artist.releases.length === 0 ? (
            <div />
          ) : (
            artist.releases.map((release) => (
              <Grid key={release._id} item>
                <ArtistReleaseItem
                  key={release._id}
                  release={release}
                  artistId={artist._id}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </Fragment>
  );
};

Artist.propTypes = {
  getArtist: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  artist: state.artist
});

export default connect(mapStateToProps, { getArtist })(Artist);
