import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteArtist } from '../../actions/artist'; // maybe remove this import if redundant

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const ArtistItem = ({
    deleteArtist,
    auth,
    artist: { _id, name, releases, user, date },
    showActions
}) => (
    <Card className="artist-card">
        <CardContent>
            <h2>{name}</h2>

            <p>
                Created on <Moment format="MM/DD/YYYY">{date}</Moment>
            </p>

            {showActions && (
                <Fragment>
                    <Link style={{ color: 'black' }} to={`/artists/${_id}`}>
                        Aritst Releases{' '}
                        {releases.length > 0 && <span>{releases.length}</span>}
                    </Link>

                    {!auth.loading && user === auth.user._id && (
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteArtist(_id)}
                                style={{ marginTop: '1rem' }}
                                type="button"
                            >
                                Delete Artist
                            </Button>
                        </div>
                    )}
                </Fragment>
            )}
        </CardContent>
    </Card>
);

ArtistItem.defaultProps = {
    showActions: true
};

ArtistItem.propTypes = {
    artist: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteArtist: PropTypes.func.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { deleteArtist }
)(ArtistItem);
