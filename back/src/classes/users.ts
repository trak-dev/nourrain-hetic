import { RegisterUserInput } from '../validators/user';
import User_Core from '../core/users';
import Nourrain_Core from "../core/nourrain";
import { LoggedUserDto } from "../dto/logged-user.dto";


export default class User_Classe {
    
    static async register(user: RegisterUserInput) {
        try {
            
            const pwd = user.password;
            const registeredUser = await User_Core.register(user);
            const token = await User_Core.login(registeredUser.email, pwd);
            registeredUser.password = "";
            return new LoggedUserDto(token, registeredUser, [], []);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email: string, password: string): Promise<LoggedUserDto> {
        try {
            const token = await User_Core.login(email, password);
            const user = await User_Core.getByToken(token);
            const joinedNourrains = await Nourrain_Core.getUserJoined(user.id);
            const createdNourrains = await Nourrain_Core.getByOwnerId(user.id);
            return new LoggedUserDto(token, user, joinedNourrains, createdNourrains);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async isUserLoggedIn(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            return !!user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
