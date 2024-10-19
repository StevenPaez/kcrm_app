import UserService from "../services/user.service.js";

class UserController {
    constructor() {
        this.userService = UserService;
    }

    async getUsers(req, res) {
        try {
            const users = await this.userService.getUsers();
            res.send(users);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}