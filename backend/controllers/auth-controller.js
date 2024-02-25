const OtpService = require("../services/otp-service");
const HashService = require("../services/hash-service");
const UserService = require("../services/user-service");
const TokenService = require("../services/token-service");


class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone number is required" });
    }

    const otp = await OtpService.generateOtp();
    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;

    const data = `${phone}.${otp}.${expires}`;

    const hash = await HashService.hashOtp(data);

    try {
      await OtpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if(!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required!" });
    }

    const [hashedOtp, expires] = hash.split(".");
    if(Date.now() > +expires) {
      res.status(400).json({ message: "OTP has expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = await OtpService.verifyOtp(hashedOtp, data);

    if(!invalid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;
    let accessToken;
    let refreshToken;
    
    //user Creation
    try {
      user = await UserService.findUser({phone});
      if(!user) {
        user = await UserService.createUser({phone});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "" });
    }

    //JWT
    tokenService.gen
  }
}

module.exports = new AuthController();
