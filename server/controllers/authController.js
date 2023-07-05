import authService from "../services/authService.js";

class AuthController {
  async register(req, res) {
    try {
      const auth = await authService.register(req.body);
      return res.status(201).json(auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const auth = await authService.login(req.body);
      return res.status(200).json(auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new AuthController();
