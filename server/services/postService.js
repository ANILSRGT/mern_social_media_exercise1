import Post from "../models/Post.js";
import User from "../models/User.js";

class PostService {
  async createPost(post) {
    try {
      const user = await User.findById(post.userId);
      const newPost = new Post({
        userId: post.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description: post.description,
        picturePath: post.picturePath,
        userPicturePath: user.picturePath,
        likes: {},
        comments: [],
      });

      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(userId) {
    try {
      const posts = await Post.find({ userId });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId, userId) {
    try {
      const post = await Post.findById(postId);
      const isLiked = post.likes.get(userId);

      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }

      const updatedPost = await Post.findByIdAndUpdate(postId, { likes: post.likes }, { new: true });

      return updatedPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new PostService();
