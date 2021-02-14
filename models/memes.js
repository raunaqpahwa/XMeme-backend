const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

memeSchema.methods.toJSON = function() {
    return {
        id: this._id,
        name: this.name,
        caption: this.caption,
        url: this.url
    };
}

module.exports = mongoose.model('meme', memeSchema);