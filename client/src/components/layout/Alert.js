import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material
import Snackbar from '@material-ui/core/Snackbar';


const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Snackbar
            variant="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            key={alert.id}
            message={alert.msg}
            open={true}
        >
        </Snackbar>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
