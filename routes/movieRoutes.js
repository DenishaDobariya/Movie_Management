const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../config/imgdb'); 

router.get('/', movieController.getAllMovies);
router.get('/add', movieController.renderAddMovie);
router.post('/add', upload.single('poster'), movieController.addMovie);
router.get('/edit/:id', movieController.renderEditMovie);
router.post('/update', upload.single('poster'), movieController.updateMovie);
router.get('/delete/:id', movieController.deleteMovie);
router.get('/view/:id', movieController.viewMovie);

module.exports = router;
