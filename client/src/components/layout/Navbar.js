import React, { Fragment, useState } from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
  },
  menuItem: {
    color: 'black',
    textDecoration: 'none'
  }
});

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const authLinks = (
    <div>
      <Button
        aria-controls='auth-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={classes.navButton}
      >
        Menu
      </Button>
      <Menu
        id='auth-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.menuItem} to='/dashboard'>
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.menuItem} to='/artists'>
            Artists
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.menuItem} to='/labels'>
            Labels
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a className={classes.menuItem} onClick={logout} href='#!'>
            Logout
          </a>
        </MenuItem>
      </Menu>
    </div>
  );

  const guestLinks = (
    <div>
      <Button>
        <Link className={classes.navButton} to='/register'>
          Register
        </Link>
      </Button>
      <Button>
        <Link className={classes.navButton} to='/login'>
          Login
        </Link>
      </Button>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar style={{backgroundColor: "purple"}}>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.navButton} to='/'>
              MU
            </Link>
          </Typography>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
