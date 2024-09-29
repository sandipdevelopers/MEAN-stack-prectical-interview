// This function is used to handle errors in a standardized way across the application
const sendError = (res, statusCode, errorCode, message) => {
    res.status(statusCode).json({
      status: false,
      errorCode: errorCode, 
      message: message,  
    });
  };
  
  // This function is used to handle successful responses in a standardized way across the application
  const sendSuccess = (res, statusCode, message, data = "") => {
    res.status(statusCode).json({
      status: true,  
      message: message,
      data  
    });
  };
  
  // Exporting the utility functions to be used in other parts of the application
  module.exports = {
    sendError,
    sendSuccess,
  };
  