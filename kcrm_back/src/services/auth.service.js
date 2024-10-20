import { JWT_SECRET } from "../../config.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {

    userLogin;
    token;

    constructor() {
        this.userModel = User;
    }

    async validateLogin(user) {
        const { email, password } = user;
        this.emailValidate(email);
        this.passwordValidate(password);
        this.generateToken();
        return {
            userLogin: this.userLogin,
            token: this.token
        };
    }

    async emailValidate(email) {
        const userLogin = await this.userModel.findOne({
            where: {
                email: email
            }
        });
        console.log(userLogin);

        if (!userLogin) {
            throw new Error('User not exist');
        }

        this.userLogin = userLogin;
    }

    async passwordValidate(password) {
        const isValid = await bcrypt.compare(password, this.userLogin.password);
        if (!isValid) {
            throw new Error('Password invalid');
        }
    }

    async generateToken() {
        const token = await jwt.sign({
            id: this.userLogin.id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        this.token = token;
    }
}

export default new AuthService();