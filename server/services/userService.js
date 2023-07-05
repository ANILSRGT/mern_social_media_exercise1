import User from "../models/User.js";

class UserService {
  async getUser(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserFriends(id) {
    try {
      const user = await User.findById(id);

      const friends = await Promise.all(
        user.friends.map(friendId => {
          return User.findById(friendId);
        })
      );

      const friendList = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      });

      return friendList;
    } catch (error) {
      throw error;
    }
  }

  async addRemoveFriend(id, friendId) {
    try {
      const user = await User.findById(id);
      const friend = await User.findById(friendId);

      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(id => id !== friendId);
        friend.friends = friend.friends.filter(id => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map(friendId => {
          return User.findById(friendId);
        })
      );

      const friendList = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      });

      return friendList;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
