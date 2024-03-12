import { User } from "../models/user.model";
import { Nourrain } from "../models/nourrain.model";

export class MeDto {
  private user: User;
  private joinedNourrains: Nourrain[] | undefined
  private createdNourrains: Nourrain[] | undefined

  constructor(
    user: User,
    joinedNourrains: Nourrain[] | undefined,
    createdNourrains: Nourrain[] | undefined
  ) {
    this.user = user;
    this.joinedNourrains = joinedNourrains;
    this.createdNourrains = createdNourrains;
  }
}
