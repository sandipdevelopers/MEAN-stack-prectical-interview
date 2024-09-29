const { sendError, sendSuccess } = require('../utils/services');
require('dotenv').config();

exports.uploadImage = async (req, res) => {
    try {
      sendSuccess(res, 200, 'upload sucessfully', {
          name:req.file.filename,
      });
    } catch (err) {
      sendError(res, 400, 'USER_CREATION_FAILED', err.message);
    }
  };
  