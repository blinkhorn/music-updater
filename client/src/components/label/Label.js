import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LabelItem from '../labels/LabelItem';
import LabelReleaseButton from './LabelReleaseButton';
import LabelReleaseItem from './LabelReleaseItem';
import { getLabel } from '../../actions/label';

// Material
import Button from '@material-ui/core/Button';

// CSS
import '../../App.css';

const Label = ({ getLabel, label: { label, loading }, match }) => {
  useEffect(() => {
    getLabel(match.params.id);
  }, [getLabel, match]);

  return loading || label === null ? (
    <div />
  ) : (
    <Fragment>
      <Button variant='contained' style={{ marginTop: '1rem' }}>
        <Link style={{ color: 'black', textDecoration: 'none' }} to='/labels'>
          Back To Labels
        </Link>
      </Button>
      <div className='label-container'>
        <LabelItem label={label} showActions={false} />
        <LabelReleaseButton labelId={label._id} />
        <div style={{ marginTop: '4rem' }}>
          {label.releases.length === 0 ? (
            <div />
          ) : (
            label.releases.map((release) => (
              <LabelReleaseItem
                key={release._id}
                release={release}
                labelId={label._id}
              />
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

Label.propTypes = {
  getLabel: PropTypes.func.isRequired,
  label: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  label: state.label
});

export default connect(mapStateToProps, { getLabel })(Label);
