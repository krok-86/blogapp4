const { User } = require("../models");

class UserController {
    async createUser(req,res) {
        const { name } = req.body;

        try {
          const user = await User.create({ name });
      
          return res.json(user);
        } catch (err) {
          console.log(">>>>>>", err);
          return res.status(500).json(err);
        }
    }
    async getUsers(req,res) {
        try {
            const users = await User.findAll();
        
            return res.json(users);
          } catch (err) {
            console.log(">>>>>>", err);
            return res.status(500).json({ error: "Something went wrong" });
          }
    }
    async getOneUser(req,res) {
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
    }
    async deleteUser(req,res) {
        const id = req.params.id;
        try {
          const user = await User.findOne({ where: { id } });
      
          await user.destroy();
      
          return res.json({ message: "User deleted!" });
        } catch (err) {
          console.log(">>>>>>", err);
          return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async updateUser(req,res) {
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
    }
}
module.exports = new UserController();