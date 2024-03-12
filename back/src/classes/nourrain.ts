import Nourrain_Core from "../core/nourrain";
import User_Core from "../core/users";
import { DetailedNourrainDto } from "../dto/detailed-nourrain";
import { User } from "../models/user.model";
import { Nourrain } from "../models/nourrain.model";
import { RandomUtils } from "../utils/random.utils";

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

      // if user is owner, retrieve members
      let userIsOwner = false;
      let members, waitingMembers: User[] | undefined = undefined;
      if(owner.id === user.id) {
        userIsOwner = true;
        members = await User_Core.getAllByNourrainId(nourrain.id, false);
        waitingMembers = await User_Core.getAllByNourrainId(nourrain.id, true);
      }

      return new DetailedNourrainDto(nourrains[0], userIsOwner, owner.firstname, owner.lastname, members, waitingMembers);
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

  static async createOne(name: string, description: string, token: string): Promise<void> {
    try {
      const user = await User_Core.getByToken(token);
      const nourrainCode = RandomUtils.generateNourrainCode();
      await Nourrain_Core.createOne(name, description, user.id, nourrainCode);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async join(code: string, token: string): Promise<void> {
    try {
      const user = await User_Core.getByToken(token);

      // find nourrain
      const nourrain = await Nourrain.findOne({where: {code}});
      if(!nourrain) {
        throw "Nourrain not found";
      }

      await Nourrain_Core.join(nourrain.id, user.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
