const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payLoad) {
    const accessToken = jwt.sign(payLoad, accessTokenSecret, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(payLoad, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({ userId: userId, token: refreshToken });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne({ userId, token: refreshToken });
  }
}

module.exports = new TokenService();
