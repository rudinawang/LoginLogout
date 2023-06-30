const jwt = require("jsonwebtoken");

//const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const TOKEN_KEY = process.env.TOKEN_KEY;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;

//TOKEN_KEY = dkdowi48903idisdsii;
//TOKEN_EXPIRY = 365;

const createToken = async (
  tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRY
) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createToken;
