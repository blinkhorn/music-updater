import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// Material Imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    actionButton: {
        color: 'black'
    }
});

const Register = ({ setAlert, register, isAuthenticated }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match');
        } else {
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        margin="normal"
                        required
                    />
                </div>
                <div>
                    <TextField
                        type="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        margin="normal"
                        required
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        margin="normal"
                        minLength="6"
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        margin="normal"
                        minLength="6"
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '1rem' }}
                    type="submit"
                >
                    Register
                </Button>
            </form>
            <p>
                Already have an account?{' '}
                <Link className={classes.actionButton} to="/login">
                    Sign In
                </Link>
            </p>
        </Fragment>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
