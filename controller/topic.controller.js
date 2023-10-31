const { Post, Topic } = require("../models");

class TopicController {
  async createTopic(req, res) {

    const { title } = req.body;

    try {      
      return res.json(topic)   
            
    } catch (err) {
      console.log(">>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getTopics(req, res) {
    try {
      const topics = await Topic.findAll();
      return res.json(topics);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneTopic(req, res) {
    const id = req.params.id;
    try {
      const topic = await Topic.findOne({
        where: { id },
        include: "posts",
      });
      if (!topic) {
        return res.status(404).send(console.log({
          message: "Topic Not Found",
        }));
      }
      return res.json(topic);
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteTopic(req, res) {
    const id = req.params.id;
    try {
      const topic = await Topic.findOne({ where: { id } });

      await topic.destroy();

      return res.json({ message: "Topic deleted!" });
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async updateTopicAndAddToPost(req, res) {
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
        return res.status(404).send({
          message: "Post Not Found",
        });
      }

      const topic = await Topic.findByPk(req.body.topicId);

      if (!topic) {
        return res.status(404).send({ message: "Topic Not Found" });
      }

      post.addTopic(topic);

      return res.status(200).send({ message: "Topic added to Post" });
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async updateTopic(req, res) {
    const id = req.params.id;
    const { title } = req.body;
    try {
      const topic = await Topic.findOne({ where: { id } });
      topic.title = title;
      await topic.save();
      return res.json(topic); //Topic update
    } catch (err) {
      console.log(">>>>>>", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
module.exports = new TopicController();
