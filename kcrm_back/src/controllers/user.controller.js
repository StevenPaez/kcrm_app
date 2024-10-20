import UserService from "../services/user.service.js";

class UserController {
    constructor() {
        this.userService = UserService;
    }

    async getUsers (req, res) {
        try {
            const users = await this.userService.getUsers();
            res.send(users);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getUser(req, res) {
        try {
            const user = await this.userService.getUser(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async createUser(req, res) {
        try {
            const userCreate = await this.userService.createUser(req.body);
            res.send(userCreate);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateUser(req, res) {
        try {
            const userUpdate = await this.userService.updateUser(req.params.id, req.body);
            res.send(userUpdate);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const userDelete = await this.userService.deleteUser(req.params.id);
            res.send(userDelete);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

export default new UserController();