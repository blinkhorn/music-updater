import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteLabelRelease } from '../../actions/label';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const LabelReleaseItem = ({
  labelId,
  release: {
    _id,
    user,
    releaseTitle,
    thumbnailURL,
    releaseYear,
    dateRetrieved
  },
  auth,
  deleteLabelRelease
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
            <p>
              Last updated on{' '}
              <Moment format='MM/DD/YYYY'>{dateRetrieved}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <Button
                variant='contained'
                color='secondary'
                style={{ marginTop: '0.5rem' }}
                onClick={() => deleteLabelRelease(labelId, _id)}
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

LabelReleaseItem.propTypes = {
  labelId: PropTypes.string.isRequired,
  release: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteLabelRelease: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteLabelRelease })(
  LabelReleaseItem
);
