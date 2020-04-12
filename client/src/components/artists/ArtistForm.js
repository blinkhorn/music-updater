import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistForm = ({ addArtist }) => {
    const [name, setName] = useState('');
    return (
        <Card className="artist-form-card">
            <CardContent>
                <div>
                    <h3>Enter an artist whose releases you'd like to stay updated on!</h3>
                </div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addArtist({ name });
                        setName('');
                    }}
                >
                    <TextField
                        name="name"
                        value={name}
                        label="Create an artist"
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

ArtistForm.propTypes = {
    addArtist: PropTypes.func.isRequired
};

export default connect(
    null,
    { addArtist }
)(ArtistForm);
