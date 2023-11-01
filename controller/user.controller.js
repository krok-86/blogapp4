const { User } = require("../models");
const  CustomError  = require("../errors");

class UserController {
    async createUser(req,res,next) {
        try {
          const { name } = req.body;// errorы - косячный параметр 400 и имя- пустая строка 400
          console.log(name.length)
          if (!name || !name.length){
            throw new CustomError('User has wrong name', 400)
          }
          const user = await User.create({ name }); // error - юзер не найден 404
          if(!user){
            throw new CustomError('User not found', 404)
          }
          return res.json(user);
        } catch (err) {
          next(err);
        }
    }
    async getUsers(req,res,next) {
        try {
            const users = await User.findAll(); // error - юзеры не найдена
            return res.json(users);
          } catch (err) {
            next(err);
          }
    }
    async getOneUser(req,res, next) {
        try {
          const id = req.params.id;

          if (!isFinite(id)) {
            throw new CustomError('User id has wrong', 400)
          }

          const user = await User.findOne({
            where: { id },
            include: "posts",// ошибка юзер не найден
          });

          if(!user) {
            throw new CustomError('User not found', 404)
          }

          //throw new CustomError(undefined, 500)
      
          return res.json(user);
        } catch (err) {
          next(err);
          // console.log(">>>>>>", err);
          // return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async deleteUser(req,res,next) { // ошибка не предан параметр
       
        try {
          const id = req.params.id;
          if (!isFinite(id)) {
            throw new CustomError('User id has wrong', 400)
          }
          const user = await User.findOne({ where: { id } }); // юзер не найден или уже удаоен
          if(!user) {
            throw new CustomError('User not found', 404)
          }
          await user.destroy();
      
          return res.json({ message: "User deleted!" });
        } catch (err) {
          next(err);
        }
    }
    async updateUser(req,res,next) {
        
        try {
          const id = req.params.id;
          if (!isFinite(id)) {
            throw new CustomError('User id is wrong', 400)
          }
        const { name } = req.body;
          const user = await User.findOne({ where: { id } });
          if(!user) {
            throw new CustomError('User not found', 404)
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