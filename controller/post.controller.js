const { Post, User} = require("../models");

class PostController {
  async createPost(req, res) {
    const { userId, postText } = req.body;

    try {
      const user = await User.findOne({ where: { id: userId } });

      const post = await Post.create({ post: postText, userId: user.id });

      return res.json(post);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json(err);
    }
  }
  async getPosts(req, res) {
    try {
      const posts = await Post.findAll({ include: ["user", "topics"] });
      console.log(">>>>>>", posts);
      return res.json(posts);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json(err);
    }
  }
  async getOnePost(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findOne({
        where: { id },
        include: ["user", "topics"],
      });
      return res.json(post);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deletePost(req, res) {
    const id = req.params.id;
    try {
      const post = await User.findOne({ where: { id } });

      await post.destroy();

      return res.json({ message: "Post deleted!" });
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async updatePost(req, res) {
    const id = req.params.id;
    const { postText } = req.body;
    try {
      const post = await Post.findOne({ where: { id } });

      post.post = postText;

      await post.save();

      return res.json(post);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
module.exports = new PostController();
