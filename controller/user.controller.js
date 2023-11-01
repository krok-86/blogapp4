const { User } = require("../models");
const CustomError = require("../errors");

class UserController {
  async createUser(req, res, next) {
    try {
      const { name } = req.body; // неверный параметр, пустая строка (400)
      console.log(name.length);
      if (!name || !name.length) {
        throw new CustomError("User has wrong name", 400);
      }
      const user = await User.create({ name });
      if (!user) {
        throw new CustomError("User was not created", 404);
      }
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
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
      if (!isFinite(id)) {   // ошибка не предан параметр
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
