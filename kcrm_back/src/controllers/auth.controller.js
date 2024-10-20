import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';
import authService from '../services/auth.service.js';

class AuthController{

    constructor() {
        this.authService = authService;
    }

    async authUser(req, res) {
        try {
            const { userLogin, token } = await this.authService.validateLogin(req.body);
            res.send({userLogin, token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

export default new AuthController();