const jwt = require('jsonwebtoken');
class TokenService {
    generateTokens(payload) {
        jwt.sign()
    }

}

module.exports = new TokenService();