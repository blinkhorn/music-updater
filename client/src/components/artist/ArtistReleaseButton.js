import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateArtistReleases } from '../../actions/artist';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistReleaseButton = ({ artistId, updateArtistReleases }) => {
    // const [buttonData, setButtonData] = useState({
    //     artist: ''
    // });

    // const { artist } = buttonData;

    // const onChange = e =>
    //     setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        updateArtistReleases(artistId);
        // setFormData({ memory: '', imageURL: '' });
    };

    return (
        <Card className="artist-form-card">
            <CardContent>
                <div>
                    <h3>Click the button to update the artist releases!</h3>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

ArtistReleaseButton.propTypes = {
    updateArtistReleases: PropTypes.func.isRequired
};

export default connect(
    null,
    { updateArtistReleases }
)(ArtistReleaseButton);
