import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteLabel } from '../../actions/label';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const LabelItem = ({
  deleteLabel,
  label: { _id, name, releases, date },
  showActions
}) => (
  <Card className='label-card'>
    <CardContent>
      <h2>{name}</h2>

      <p>
        Created on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <Link style={{ color: 'black' }} to={`/labels/${_id}`}>
            Label Releases{' '}
            {releases.length > 0 && <span>{releases.length}</span>}
          </Link>
          <div>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => deleteLabel(_id)}
              style={{ marginTop: '1rem' }}
              type='button'
            >
              Delete Label
            </Button>
          </div>
        </Fragment>
      )}
    </CardContent>
  </Card>
);

LabelItem.defaultProps = {
  showActions: true
};

LabelItem.propTypes = {
  label: PropTypes.object.isRequired,
  deleteLabel: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

export default connect(null, { deleteLabel })(LabelItem);
