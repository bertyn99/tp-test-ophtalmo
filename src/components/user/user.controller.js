import User from './user.entities.js';
import e from "express";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  
    createUser = async (req, res) => {
      try {
        const createdUser = await this.userService.addUser(req.body.email, req.body.password);
        res.status(201).send(createdUser.toJSON());
      } catch (err) {
        res.status(403).send(err.message);
      }
    };
  
    updateUser = async (req, res) => {
      try {
        const updatedUser = await this.userService.updateUser(req.body.email, req.body.password, req.body.id);
        res.status(200).send(updatedUser.toJSON());
      } catch (err) {
        res.status(404).send(err.message);
      }
    };
  
    getUsers = async (_, res) => {
      try {
        const users = await this.userService.getUsers();
        const usersJSON = users.map(user => user.toJSON());
        res.status(200).send(usersJSON);
      } catch (err) {
        res.status(500).send(err.message);
      }
    };
  
    getUserById = async (req, res) => {
      try {
        const { id } = req.params;
        const user = await this.userService.getUserById(id);
        res.status(200).send(user);
      } catch (err) {
        res.status(404).send(err.message);
      }
    };
  
    deleteUserById = async (req, res) => {
      try {
        const { id } = req.params;
        await this.userService.deleteUserById(id);
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).send(err.message);
      }
    };
  
    login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await this.userService.login(email, password);
        res.status(201).send(user);
      } catch (err) {
        res.status(401).send(err.message);
      }
    };
  
    deleteUsers = async (_, res) => {
      try {
        await this.userService.deleteUsers();
        res.status(200).send({ message: 'All users deleted successfully' });
      } catch (err) {
        res.status(500).send(err.message);
      }
    };
  }
}

export default UserController;
