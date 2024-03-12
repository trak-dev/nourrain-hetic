import { RegisterUserInput } from '../validators/user';
import User_Core from '../core/users';
import Nourrain_Core from "../core/nourrain";
import { MeDto } from "../dto/me.dto";


export default class User_Classe {
    
    static async register(user: RegisterUserInput) {
        try {
            const pwd = user.password;
            const registeredUser = await User_Core.register(user);
            const token = await User_Core.login(registeredUser.email, pwd);
            registeredUser.password = "";
            return {token};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email: string, password: string): Promise<{ token: string }> {
        try {
            const token = await User_Core.login(email, password);
            return { token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async me(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            const joinedNourrains = await Nourrain_Core.getUserJoined(user.id);
            const createdNourrains = await Nourrain_Core.getByOwnerId(user.id);
            return new MeDto(user, joinedNourrains, createdNourrains);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
