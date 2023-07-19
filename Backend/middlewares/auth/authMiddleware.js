const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //find the user by id
        const user = await User.findById(decoded?.id).select("-password");
        //attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, login again");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});

module.exports = authMiddleware;



/*This code is implementing an authentication middleware using Express.js and JSON Web Tokens (JWT). The middleware is responsible for verifying the authenticity and authorization of incoming requests.
Here's a breakdown of the code:
The code imports the required dependencies: expressAsyncHandler, jsonwebtoken, and the User model.
The authMiddleware function is defined as an asynchronous middleware function using expressAsyncHandler. This allows us to handle any errors that occur during asynchronous operations within the middleware.
Inside the middleware function, it first checks if the request headers contain an authorization header that starts with "Bearer". This is a common convention for including JWTs in the authorization header of HTTP requests.
If the authorization header is found, the code extracts the JWT from the header by splitting it and retrieving the second part.
The code then attempts to verify the JWT using jsonwebtoken.verify by passing the token and a secret key (process.env.JWT_KEY). The secret key should match the one used to sign the token during authentication.
If the JWT is successfully verified, the code proceeds to find the user associated with the decoded token's id property. It uses the User model and the findById method to retrieve the user from the database. The select("-password") method is used to exclude the password field from the retrieved user object.
Once the user is retrieved, the code attaches the user object to the req.user property. This allows subsequent middleware or route handlers to access the authenticated user.
Finally, if all the authentication steps are successful, the middleware calls next() to pass control to the next middleware or route handler in the chain.
If any errors occur during the authentication process, such as an invalid token or expired token, the code throws an error with an appropriate error message.
The authMiddleware function is exported as the module's module.exports, making it available for use in other parts of the application.

Overall, this middleware ensures that incoming requests have a valid JWT in the authorization header, verifies the token's authenticity, retrieves the corresponding user from the database, and attaches the user object to the request for further processing.*/





