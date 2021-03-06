import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteArtist } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistItem = ({
  deleteArtist,
  artist: { _id, name, releases, date },
  showActions
}) => (
  <Card className='artist-card'>
    <CardContent>
      <h2>{name}</h2>

      <p>
        Created on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <Link style={{ color: 'black' }} to={`/artists/${_id}`}>
            Aritst Releases{' '}
            {releases.length > 0 && <span>{releases.length}</span>}
          </Link>
          <div>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => deleteArtist(_id)}
              style={{ marginTop: '1rem' }}
              type='button'
            >
              Delete Artist
            </Button>
          </div>
        </Fragment>
      )}
    </CardContent>
  </Card>
);

ArtistItem.defaultProps = {
  showActions: true
};

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired,
  deleteArtist: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

export default connect(null, { deleteArtist })(ArtistItem);
