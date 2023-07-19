//Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//Err handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler, notFound };



/*notFound function:

This function is designed to handle cases where the requested route or resource is not found (404 - Not Found).
It takes three parameters: req, res, and next, which represent the request, response, and next middleware function in the chain, respectively.
Inside the function, it creates a new Error object with a message that includes the original URL that was not found.
It sets the HTTP status code of the response to 404 (Not Found).
It then calls the next function with the error object, passing it to the next error-handling middleware in the chain.
errorHandler function:

This function is designed to handle errors that occur during the execution of the application.
It takes four parameters: err, req, res, and next, representing the error, request, response, and next middleware function, respectively.
It first determines the appropriate status code for the response based on the existing status code (res.statusCode). If the existing status code is 200 (OK), it sets the status code to 500 (Internal Server Error); otherwise, it keeps the existing status code.
It constructs a JSON response object with a message property containing the error message from the err object.
If the application is running in production mode (determined by process.env.NODE_ENV), it sets the stack property of the response object to null to avoid exposing sensitive error details. Otherwise, it includes the error stack trace.
Finally, it sends the JSON response object to the client.*/