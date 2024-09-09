const Movie = require('../models/Movie//movieModel');
const path = require('path');
const fs = require('fs');

const getAllMovies = async (req, res) => {
    const movies = await Movie.find({});
    res.render('index', { movies });
};

const renderAddMovie = (req, res) => {
    res.render('addMovie');
};

const addMovie = async (req, res) => {
    const movieData = {
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        rating: req.body.rating,
        poster: req.file.path
    };
    const newMovie = new Movie(movieData);
    await newMovie.save();
    res.redirect('/');
};

const renderEditMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('editMovie', { movie });
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.body;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        if (req.file) {
            const oldPosterPath = path.join(__dirname, '..', movie.poster);
            if (fs.existsSync(oldPosterPath)) {
                fs.unlinkSync(oldPosterPath);
            }
            movie.poster = req.file.path;
        }
        movie.title = req.body.title;
        movie.description = req.body.description;
        movie.releaseDate = req.body.releaseDate;
        movie.genre = req.body.genre;
        movie.rating = req.body.rating;

        await movie.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie.poster) {
        const posterPath = path.join(__dirname, '..', movie.poster);
        if (fs.existsSync(posterPath)) {
            fs.unlinkSync(posterPath);
        }
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/');
};
const viewMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    movie.posterPath = movie.poster.replace(/\\/g, '/'); 
    res.render('viewMovie', { movie });
};


module.exports = {
    getAllMovies,
    renderAddMovie,
    addMovie,
    renderEditMovie,
    updateMovie,
    deleteMovie,
    viewMovie
};
