import User from "../models/user.model.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async getUsers() {
        const users = await this.userModel.findAll();
        return users;
    }
}