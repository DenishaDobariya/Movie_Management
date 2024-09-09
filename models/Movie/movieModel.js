const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date },
    genre: { type: String },
    rating: { type: Number },
    poster: { type: String }
});

module.exports = mongoose.model('Movie', movieSchema);
