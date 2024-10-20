import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { SALT } from "../../config.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async getUsers() {
        return await this.userModel.findAll();
    }

    async getUser(id){
        return await this.userModel.findByPk(id);
    }

    async createUser(user) {
        user.password = await bcrypt.hash(user.password, SALT);
        return await this.userModel.create(user);
    }

    async updateUser(id, user) {
        if(user.password) user.password = await bcrypt.hash(user.password, SALT);
        return await this.userModel.update(user, {
            where: {
                id: id
            }
        });
    }

    async deleteUser(id) {
        return await this.userModel.destroy({
            where: {
                id: id
            }
        });
    }
}

export default new UserService();