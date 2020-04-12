import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLabel } from '../../actions/label';

// Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const LabelForm = ({ addLabel }) => {
    const [name, setName] = useState('');
    return (
        <Card className="label-form-card">
            <CardContent>
                <div>
                    <h3>Enter a label whose releases you'd like to stay updated on!</h3>
                </div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addLabel({ name });
                        setName('');
                    }}
                >
                    <TextField
                        name="name"
                        value={name}
                        label="Create a label"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '0.5rem' }}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

LabelForm.propTypes = {
    addLabel: PropTypes.func.isRequired
};

export default connect(
    null,
    { addLabel }
)(LabelForm);
