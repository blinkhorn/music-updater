import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LabelItem from './LabelItem';
import LabelForm from './LabelForm';
import { getCurrentUserLabels } from '../../actions/label';

// Material
import Grid from '@material-ui/core/Grid';

// CSS
import '../../App.css';

const Labels = ({ getCurrentUserLabels, auth, label: { labels, loading } }) => {
  useEffect(() => {
    getCurrentUserLabels();
  }, [getCurrentUserLabels]);

  return loading ? (
    <div></div>
  ) : (
    <Fragment>
      <h1>Labels</h1>
      <p>Welcome to Music Updater (MU)!</p>
      <div className='label-container'>
        <LabelForm />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          {labels
            .filter((label) => !auth.loading && label.user === auth.user._id)
            .map((label) => (
              <Grid key={label._id} item>
                <LabelItem key={label._id} label={label} />
              </Grid>
            ))}
        </Grid>
      </div>
    </Fragment>
  );
};

Labels.propTypes = {
  getCurrentUserLabels: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  label: state.label,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUserLabels })(Labels);
