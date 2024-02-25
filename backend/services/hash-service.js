const crypto = require("crypto");

class HashService {
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }

  verifyOtp(hashedOtp, data) {
    const hash = this.hashOtp(data);
    return hash === hashedOtp;
  }
}

module.exports = new HashService();
