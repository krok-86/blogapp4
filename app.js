const express = require("express");
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const topicRouter = require('./routes/topic.routes');
const { sequelize } = require("./models");
const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', topicRouter);

app.listen({ port: 3003 }, async () => {
  console.log("Server up on http://localhost:3003");
  try {
  await sequelize.authenticate();
  console.log("Database Connected!");
  } catch (err){    
    console.error(">>>>>>>>>>>Unable to connect to the database:", err);    
  }
});
