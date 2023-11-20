const { User } = require("../models");
const CustomError = require("../errors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} =require("express-validator")

class UserController {

  async registrationUser (req, res, next) {
    const errors = validationResult(req); 
  if (!errors.isEmpty()){
    return res.status(400).json(errors.array());
  }
  const { name, email, password } = req.body; 
  try {
    const userWithEmail = await User.findOne({where: {email}});
    if (userWithEmail) {
      throw new CustomError("This email has already been registrated", 403);
    }
  } catch(err) {
    next(err);
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const paramsHash = await bcrypt.hash(password,salt);
try{
  const user = await User.create({ name, email, password:paramsHash});
  const token = jwt.sign({
    _id: user.id
  },
  "secret123",
  {
expiresIn: '7d',
  },
  );
  const { password, ...userData} = user.dataValues;
  res.json({userData, token})
} catch(err) {
  err.message = 'Server error: user was not created';
  err.code = '500';
  next(err);
}
};

async authorizationUser (req, res, next) {
try {
const user = await User.findOne({ where: {email: req.body.email}})
if (!user) {
  throw new CustomError("User data not found", 404);
}
const isValidPass = await bcrypt.compare(req.body.password, user.password)
if (!isValidPass) {
  throw new CustomError("email or password is wrong", 404);
}
const token = jwt.sign({
  _id: user.id
},
"secret123",
{
expiresIn: '7d',
},
);
const { password, ...userData} = user.dataValues;
res.json({userData, token});

} catch(err) {
  err.message = 'Server error: user was not authorized';
  err.code = '500';
  next(err);
}
}

async authorizationMeUser (req, res, next) {
  console.log(req.userId)
try{
  const user = await User.findOne({
    where: { id: req.userId },
  });
  console.log(user)
  if (!user) {
    throw new CustomError("user not found", 404);
  }
  console.log(user);
  const { password, ...userData} = user.dataValues;
res.json(userData);

} catch (err) {
  err.message = 'Server error: user was not found';//add my err
  err.code = '500';
  next(err);
   }
}

  // async authUser (req, res, next) {
  //   console.log(req.body);
  //   try {
  //     const {email, password} = req.body;
  //     if (!email || !email.length || !password || !password.length) {//???
  //       throw new CustomError("User has wrong data", 400);
  //     }
  //     const user = await User.findOne({
  //       where: [{email},{password}]
  //     }); 
  //     if (!user) {//???
  //       throw new CustomError("User data not found", 404);
  //     }
  //     console.log(".....>>>>>>>>>.......",user)
  //     return res.json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
  async getOneUser(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("User's id is not correct", 400);
      }
      const user = await User.findOne({
        where: { id },
        include: "posts",
      });
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        // ошибка не предан параметр
        throw new CustomError("User id is not correct", 400);
      }
      const user = await User.findOne({ where: { id } }); // юзер не найден или уже удален
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      await user.destroy();
      return res.json({ message: "User deleted!" });
    } catch (err) {
      next(err);
    }
  }
  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      if (!isFinite(id)) {
        throw new CustomError("User id is not correct", 400);
      }
      const { name } = req.body;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      user.name = name;
      await user.save();
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserController();
