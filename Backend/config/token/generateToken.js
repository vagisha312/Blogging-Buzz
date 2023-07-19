const jwt = require("jsonwebtoken");    //This line imports the jsonwebtoken library, which provides the functionality to generate and verify JWT tokens.

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" });
};

module.exports = generateToken;



/*return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" });: This line generates the JWT token using the jwt.sign() method provided by the jsonwebtoken library. It takes three arguments:

The first argument { id } is an object containing the id parameter passed to the generateToken function. It represents the payload or the information to be included in the token.

The second argument process.env.JWT_KEY is the secret key used to sign the token. It is retrieved from the environment variable JWT_KEY. The secret key is known only by the server and is used to verify the authenticity of the token later.

The third argument { expiresIn: "20d" } specifies the expiration time of the token. In this case, the token will expire after 20 days.*/