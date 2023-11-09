const { Post, Topic } = require("../models");
const CustomError = require("../errors");

class TopicController {
  async createTopic(req, res, next) {
    try {
      const { title } = req.body;
      if (!title || !title.length) {
        throw new CustomError("Topic has wrong title", 400);
      }
      const topic = await Topic.create({ title });
      if (!topic) {
        throw new CustomError("Topic was not created", 404);
      }
      return res.json(topic);
    } catch (err) {
      next(err);
    }
  }
  async getTopics(req, res, next) {
    try {
      const topics = await Topic.findAll();
      return res.json(topics);
    } catch (err) {
      next(err);
    }
  }
  async getOneTopic(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("Topic id is not correct", 400);
      }
      const topic = await Topic.findOne({
        where: { id },
        include: "posts",
      });
      if (!topic) {
        throw new CustomError("Topic is not found", 404);
      }
      return res.json(topic);
    } catch (err) {
      next(err);
    }
  }
  async deleteTopic(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        // ошибка не предан параметр
        throw new CustomError("Topic id is not correct", 400);
      }
      const topic = await Topic.findOne({ where: { id } });
      if (!user) {
        throw new CustomError("Topic is not found", 404);
      }
      await topic.destroy();
      return res.json({ message: "Topic deleted!" });
    } catch (err) {
      next(err);
    }
  }
  async updateTopicAndAddToPost(req, res, next) {
    try {
      const post = await Post.findByPk(req.body.postId, {
        include: [
          {
            model: Topic,
            as: "topics",
          },
        ],
      });
      if (!post) {
        throw new CustomError("Post is not found", 404);
        // return res.status(404).send({
        //   message: "Post Not Found",
        // });
      }
      const topic = await Topic.findByPk(req.body.topicId);

      if (!topic) {
        throw new CustomError("Topic is not found", 404);
        // return res.status(404).send({ message: "Topic Not Found" });
      }

      await post.addTopic(topic);
      return res.json({ message: "Topic added to Post" }); //не работает
      // post.addTopic(topic);
      // return res.status(200).send({ message: "Topic added to Post" });
    } catch (err) {
      next(err);
    }
  }
  async updateTopic(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("Topic id is not correct", 400);
      }
      const { title } = req.body;
      const topic = await Topic.findOne({ where: { id } });
      if (!topic) {
        throw new CustomError("Topic is not found", 404);
      }
      topic.title = title;
      await topic.save();
      return res.json(topic); //Topic update
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new TopicController();
