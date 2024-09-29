const express = require('express');
const {uploadImage } = require('../controllers/imageUploade');
const upload = require('../middleware/imageUplode')
const router = express.Router();

router.post('/single', upload.single('image'),uploadImage);

module.exports = router;