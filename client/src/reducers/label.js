import {
    GET_ALL_LABELS,
    GET_CURRENT_USER_LABELS,
    LABEL_ERROR,
    DELETE_LABEL,
    ADD_LABEL,
    GET_LABEL,
    UPDATE_LABEL_RELEASES,
    REMOVE_LABEL_RELEASE
} from '../actions/types';

const initialState = {
    labels: [],
    label: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_LABELS:
        case GET_CURRENT_USER_LABELS:
            return {
                ...state,
                labels: payload,
                loading: false
            };
        case GET_LABEL:
            return {
                ...state,
                label: payload,
                loading: false
            };
        case ADD_LABEL:
            return {
                ...state,
                labels: [payload, ...state.labels],
                loading: false
            };
        case DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter(
                    label => label._id !== payload
                ),
                loading: false
            };
        case LABEL_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LABEL_RELEASES:
            return {
                ...state,
                label: { ...state.label, releases: payload }, // TEST THIS OUT, might have to change
                loading: false
            };
        case REMOVE_LABEL_RELEASE:
            return {
                ...state,
                label: {
                    ...state.label,
                    releases: state.label.releases.filter(
                        release => release._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}
