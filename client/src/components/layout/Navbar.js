import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// Material
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    navButton: {
        color: 'white',
        textDecoration: 'none'
    }
});

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const classes = useStyles();

    const authLinks = (
        <div>
            <Button >
                <Link className={classes.navButton} to="/dashboard">Dashboard</Link>
            </Button>
            {/* <Button>
                <Link className={classes.navButton} to="/artists">Artists</Link>
            </Button>
            <Button>
                <Link className={classes.navButton} to="/labels">Labels</Link>
            </Button> */}
            <Button>
                <a className={classes.navButton} onClick={logout} href="#!">
                    Logout
                </a>
            </Button>
        </div>
    );

    const guestLinks = (
        <div>
            <Button>
                <Link className={classes.navButton} to="/register">Register</Link>
            </Button>
            <Button>
                <Link className={classes.navButton} to="/login">Login</Link>
            </Button>
        </div>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.navButton} to="/">MUSIC UPDATER</Link>
                    </Typography>
                    {!loading && (
                        <Fragment>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

Navbar.protoTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);
