import userService from "../services/userService.js";

class UserController {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getUserFriends(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserFriends(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async addRemoveFriend(req, res) {
    try {
      const { id, friendId } = req.params;
      const user = await userService.addRemoveFriend(id, friendId);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UserController();
