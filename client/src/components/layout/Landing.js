import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  actionButton: {
    color: 'black',
    textDecoration: 'none'
  },
  landingWrapper: {
    textAlign: 'center'
  }
});

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <div className={classes.landingWrapper}>
          <h1>Music Updater (MU) | A Tool For Finding New Music</h1>
          <p>
            Stay updated on your favorite artist and record label releases!
          </p>
          <div>
            <Button>
              <Link className={classes.actionButton} to='/register'>
                Sign Up
              </Link>
            </Button>
            <Button>
              <Link className={classes.actionButton} to='/login'>
                Login
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
