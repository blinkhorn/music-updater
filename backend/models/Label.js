const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
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
            resourceURL: {
                type: String
            },
            thumbnailURL: {
                type: String
            },
            releaseTitle: {
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

module.exports = Label = mongoose.model('label', LabelSchema);