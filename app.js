const express = require("express");

const { sequelize, User, Post, Topic } = require("./models");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.create({ name });

    return res.json(user);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id },
      include: "posts",
    });

    return res.json(user);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });

    await user.destroy();

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const user = await User.findOne({ where: { id } });

    user.name = name;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/posts", async (req, res) => {
  const { userId, postText } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });

    const post = await Post.create({ post: postText, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["user", "topic"] });
    console.log(">>>>>>", posts);
    return res.json(posts);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json(err);
  }
});

app.get("/posts/:id", async (req, res) => {
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
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await User.findOne({ where: { id } });

    await post.destroy();

    return res.json({ message: "Post deleted!" });
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/posts/:id", async (req, res) => {
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
});

app.post("/topics", async (req, res) => {
  const { title } = req.body;

  try {
    const topic = await Topic.create({ title });

    return res.json(topic);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json(err);
  }
});

app.get("/topics", async (req, res) => {
  try {
    const topics = await Topic.findAll();

    return res.json(topics);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/topics/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const topic = await Topic.findOne({
      where: { id },
      include: "posts",
    });

    return res.json(topic);
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/topics/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const topic = await Topic.findOne({ where: { id } });

    await topic.destroy();

    return res.json({ message: "Topic deleted!" });
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/topics/:id", async (req, res) => {
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
});

app.put("/topics/add", async (req, res) => {
  try {
    return Post.findByPk(req.body.postId, {
      include: [
        {
          model: Topic,
          as: "topics",
        },
      ],
    }).then((post) => {
      console.log(post);
      if (!post) {
        return res.status(404).send({
          message: "Post Not Found",
        });
      }
      Topic.findByPk(req.body.topicId).then((topic) => {
        if (!topic) {
          return res.status(404).send({ message: "Topic Not Found" });
        }
        post.addTopic(topic);
        return res.status(200).send({ message: "Topic added to Post" });
      });
    });
  } catch (err) {
    console.log(">>>>>>", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen({ port: 3003 }, async () => {
  console.log("Server up on http://localhost:3003");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
