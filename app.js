const express = require("express");
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const topicRouter = require('./routes/topic.routes');
const { sequelize } = require("./models");
// const CustomError = require("./errors");
const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', topicRouter);

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  const message = error.message || 'Something went wrong on the server side';
res.json({status: error.status, message, stack: error.stack})
console.log("Error status: ", error.status);
console.log("Message :", message);
})


app.listen({ port: 3003 }, async () => {
  console.log("Server up on http://localhost:3003");
  try {
  await sequelize.authenticate();
  console.log("Database Connected!");
  } catch (err){    
    console.error(">>>>>Unable to connect to the database:", err); 
  }
});
