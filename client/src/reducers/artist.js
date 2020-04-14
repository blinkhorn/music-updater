import {
    GET_ALL_ARTISTS,
    GET_CURRENT_USER_ARTISTS,
    ARTIST_ERROR,
    DELETE_ARTIST,
    ADD_ARTIST,
    GET_ARTIST,
    GET_CURRENT_ARTIST,
    UPDATE_CURRENT_ARTIST,
    UPDATE_ARTIST_RELEASES,
    REMOVE_ARTIST_RELEASE
} from '../actions/types';

const initialState = {
    artists: [],
    artist: null,
    currentArtist: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_ARTISTS:
        case GET_CURRENT_USER_ARTISTS:
            return {
                ...state,
                artists: payload,
                loading: false
            };
        case GET_ARTIST:
            return {
                ...state,
                artist: payload,
                loading: false
            };
        case GET_CURRENT_ARTIST:
            return {
                ...state,
                currentArtist: payload,
                loading: false
            };
        case ADD_ARTIST:
            return {
                ...state,
                artists: [payload, ...state.artists],
                loading: false
            };
        case DELETE_ARTIST:
            return {
                ...state,
                artists: state.artists.filter(
                    artist => artist._id !== payload
                ),
                loading: false
            };
        case ARTIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_ARTIST_RELEASES:
            return {
                ...state,
                artist: { ...state.artist, releases: payload },
                loading: false
            };
        case UPDATE_CURRENT_ARTIST:
            return {
                ...state,
                currentArtist: payload,
                loading: false
            };
        case REMOVE_ARTIST_RELEASE:
            return {
                ...state,
                artist: {
                    ...state.artist,
                    releases: state.artist.releases.filter(
                        release => release._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}
