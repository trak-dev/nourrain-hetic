import { User, initUser } from '../models/user.model';
import { RegisterUserInput } from '../validators/user';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export default class User_Core {
    
    static async register(user: RegisterUserInput) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            return await User.create(user);
        } catch (error: any) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                switch (error.errors[0].path) {
                    case 'email':
                        throw 'Email already exists';
                    default:
                        throw error.errors.message;
                }
            } else {
                throw "an error occured while creating the user";
            }
        }
    }

        static async login(email: string, password: string) {
        try {
            const user = await User.findOne({where: {email: email}});
            if (!user) throw "Nom de compte incorrect";
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw "Mot de passe incorrect";
            user.password = "";
            const token = await jwt.sign({ user }, config.jwtSecret, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error(error);
            if (typeof error === 'string') throw error;
            throw "an error occured while logging in the user";
        }
    }

    static async getByToken(token: string) {
        try {
            const userToken = (await jwt.verify(token, config.jwtSecret)) as JwtPayload;
            const user = await User.findOne({where: {id: userToken.user.id}});
            if (!user) throw "user not found";
            user.password = "";
            return user as User;
        } catch (error) {
            console.error(error);
            throw "invalid token";
        }
    }
}