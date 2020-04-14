import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// Material Imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  actionButton: {
    color: 'black'
  }
});

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1>Sign In</h1>
      <p>Sign Into Your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            type='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            margin='normal'
            required
          />
        </div>
        <div>
          <TextField
            type='password'
            label='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            margin='normal'
            minLength='6'
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          style={{ marginTop: '1rem' }}
          type='submit'
        >
          Login
        </Button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link className={classes.actionButton} to='/register'>
          Sign Up
        </Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
