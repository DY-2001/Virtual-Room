const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payLoad) {
    const accessToken = jwt.sign(payLoad, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payLoad, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }
}

module.exports = new TokenService();
