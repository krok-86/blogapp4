const { Post, User, Topic} = require("../models");
const CustomError = require("../errors");

class PostController {
  async createPost(req, res, next) {
    console.log(req.body);
    try {
      const { userId, topicId, postText } = req.body;
      if (!postText || !postText.length) {
        throw new CustomError("Post has wrong postText", 400);
      }
      if (!userId || !isFinite(userId)) {
        throw new CustomError("Post has wrong userId", 400);
      }
      const user = await User.findOne({ where: { id: +userId } });
      if (!user) {
        throw new CustomError("UserId was not created", 404);
      }
      const post = await Post.create({ post: postText, topicId: topicId.id, userId: user.id });
      if (!post) {
        throw new CustomError("Post was not created", 404);
      }
      const topic = await Topic.findByPk(req.body.topicId);

      if (!topic) {
        throw new CustomError("Topic is not found", 404);        
      }
      await post.addTopic(topic);
      return res.json(post);
    } catch (err) {
      next(err);
    }
  }
  async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({ include: ["user", "topics"] });
      return res.json(posts);
    } catch (err) {
      next(err);
    }
  }
  async getOnePost(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("Post's id is not correct", 400);
      }
      const post = await Post.findOne({
        where: { id },
        include: ["user", "topics"],
      });
      if (!post) {
        throw new CustomError("Post is not found", 404);
      }
      return res.json(post);
    } catch (err) {
      next(err);
    }
  }
  async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("Post's id is not correct", 400);
      }
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        throw new CustomError("Post is not found", 404);
      }
      await post.destroy();
      return res.json({ message: "Post deleted!" });
    } catch (err) {
      next(err);
    }
  }
  async updatePost(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("Post's id is not correct", 400);
      }
      const { postText } = req.body;
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        throw new CustomError("Post is not found", 404);
      }
      post.post = postText;
      await post.save();
      return res.json(post);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new PostController();
