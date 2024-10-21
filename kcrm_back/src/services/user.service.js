import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { SALT } from "../../config.js";
import Role from "../models/role.model.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async getUsers() {
        return await this.userModel.findAll({
            attributes: ['id', 'name', 'email'],
            include: [{
                model: Role,
                as: 'role'
            }]
        });
    }

    async getUser(id){
        return await this.userModel.findByPk(id);
    }

    async createUser(user) {
        user.password = await bcrypt.hash(user.password, SALT);
        return await this.userModel.create(user);
    }

    async updateUser(id, user) {
        if(user.password)
        {
            user.password = await bcrypt.hash(user.password, SALT);
        } else {
            delete user.password;
        }

        return await this.userModel.update(user, {
            where: {
                id: id
            }
        });
    }

    async deleteUser(id) {
        const user = await this.userModel.findByPk(id);

        if(!user) {
            throw new Error('User not found');
        }

        await user.destroy();
    }
}

export default new UserService();