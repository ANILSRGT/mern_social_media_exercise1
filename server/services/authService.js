import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

class AuthService {
  async register(user) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User(user);
      newUser.password = hashedPassword;
      newUser.viewedProfile = Math.floor(Math.random() * 1000);
      newUser.impressions = Math.floor(Math.random() * 1000);

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async login(user) {
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) throw new Error("User does not exist");

      const isMatchPass = await bcrypt.compare(user.password, existingUser.password);
      if (!isMatchPass) throw new Error("Invalid credentials");

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      delete existingUser.password;

      return { token, user: existingUser };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
