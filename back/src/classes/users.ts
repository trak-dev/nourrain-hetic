import { RegisterUserInput } from '../validators/user';
import User_Core from '../core/users';


export default class User_Classe {
    
    static async register(user: RegisterUserInput) {
        try {
            
            const pwd = user.password;
            const registeredUser = await User_Core.register(user);
            const token = await User_Core.login(registeredUser.email, pwd);
            registeredUser.password = "";
            return {token, user: registeredUser};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email: string, password: string) {
        try {
            const token = await User_Core.login(email, password);
            const user = await User_Core.getByToken(token);
            return {token, user};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async isUserLoggedIn(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}