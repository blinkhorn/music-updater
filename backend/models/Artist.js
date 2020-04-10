const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    artistId: {
        type: Number,
        reuqired: true
    },
    releases: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            artist: {
                type: String,
                required: true
            },
            releaseId: {
                type: Number,
                required: true
            },
            mainRelease: {
                type: String
            },
            resourceURL: {
                type: String
            },
            thumbnailURL: {
                type: String
            },
            releaseTitle: {
                type: String
            },
            releaseType: {
                type: String
            },
            releaseYear: {
                type: String
            },
            dateRetrieved: {
                type: Date,
                defautlt: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Artist = mongoose.model('artist', ArtistSchema);