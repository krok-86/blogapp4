const express = require("express");
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const topicRouter = require('./routes/topic.routes');
const cors = require('cors')
const { sequelize } = require("./models");
// const CustomError = require("./errors");
const app = express();
app.use(cors())
app.use(express.json());

// const corsOptions = {
//   origin: 'http://localhost:3003',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use('/blog', cors(), userRouter);
app.use('/blog', cors(), postRouter);
app.use('/blog', cors(), topicRouter);

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
