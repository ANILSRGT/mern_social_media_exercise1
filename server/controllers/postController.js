import postService from "../services/postService.js";

class PostController {
  async createPost(req, res) {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await postService.getPosts();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getUserPosts(req, res) {
    try {
      const posts = await postService.getUserPosts(req.params.userId);
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async likePost(req, res) {
    try {
      const post = await postService.likePost(req.params.id, req.body.userId);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new PostController();
