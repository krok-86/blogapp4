const express = require("express");
const jwt = require('jsonwebtoken')
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const topicRouter = require("./routes/topic.routes");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();

const registration = require("./validations/auth")
const {validationResult} =require("express-validator")

app.use(cors());
app.use(express.json());

app.use("/blog", cors(), userRouter);
app.use("/blog", cors(), postRouter);
app.use("/blog", cors(), topicRouter);

app.post ('/blog/register', registration, (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors.array());    
  }
  res.json({
    success: true,
    
  })
});
// const token = jwt.sign({
//   name: 'kosta',
//   email: req.body.email,
// },
// 'secret123',
// );
// res.json({
//   success: true,
//   token,
// })

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const message = error.message || "Something went wrong on the server side";
  res.json({ status: error.status, message, stack: error.stack });
  console.log("Error status: ", error.status);
  console.log("Message :", message);
});

app.listen({ port: 3003 }, async () => {
  console.log("Server up on http://localhost:3003");
  try {
    await sequelize.authenticate();
    console.log("Database Connected!");
  } catch (err) {
    console.error(">>>>>Unable to connect to the database:", err);
  }
});
