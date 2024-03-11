import Nourrain_Core from "../core/nourrain";
import User_Core from "../core/users";
import { DetailedNourrainDto } from "../dto/detailed-nourrain";
import { User } from "../models/user.model";

export default class Nourrain_Class {

  static async getOneById(nourrainId: string, token: string): Promise<DetailedNourrainDto> {
    const parsedNourrainId = this.checkNourrainId(nourrainId);
    try {
      const user = await User_Core.getByToken(token);
      const nourrains = await Nourrain_Core.getOneByUserId(parsedNourrainId, user.id);
      if(!nourrains || nourrains.length <= 0) {
        throw "Nourrain not found for this user";
      }
      const nourrain = nourrains[0];

      const owner = await User.findOne({where: {id: nourrain.owner_id}});
      if(!owner) {
        throw "Owner not found";
      }

      // if user is owner, retrieve all members
      let members: User[] | undefined = undefined;
      if(owner.id === user.id) {
        members = await User_Core.getAllByNourrainId(nourrain.id);
      }

      return new DetailedNourrainDto(nourrains[0], owner.firstname, owner.lastname, members);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async increment(nourrainId: string, token: string): Promise<void> {
    try {
      // retrieve the user
      const user = await User_Core.getByToken(token);
      const nourrain = await this.getOneById(nourrainId, token);

      // check if the user has enough points
      if(user.wallet <= 0) {
        throw "Not enough points :/";
      }

      await Nourrain_Core.incrementOneById(nourrain.getNourrainId());
      await User_Core.decrementOneById(user.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private static checkNourrainId(nourrainId: string): number {
    const parsedNourrainId = parseInt(nourrainId);
    if(isNaN(parsedNourrainId)) {
      throw "Invalid 'id' param";
    }
    return parsedNourrainId
  }
}
