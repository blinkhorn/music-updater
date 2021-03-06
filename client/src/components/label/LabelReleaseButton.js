import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLabelReleases } from '../../actions/label';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const LabelReleaseButton = ({ labelId, updateLabelReleases }) => {

    const onSubmit = async e => {
        e.preventDefault();
        updateLabelReleases(labelId);
    };

    return (
        <Card className="label-form-card" style={{ marginBottom: '4rem' }}>
            <CardContent>
                <div>
                    <h3>Update the label releases</h3>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        type="submit"
                    >
                        Update
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

LabelReleaseButton.propTypes = {
    updateLabelReleases: PropTypes.func.isRequired
};

export default connect(
    null,
    { updateLabelReleases }
)(LabelReleaseButton);
