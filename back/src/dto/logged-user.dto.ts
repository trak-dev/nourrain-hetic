import { User } from "../models/user.model";
import { Nourrain } from "../models/nourrain.model";

export class LoggedUserDto {
  private token: string;
  private user: User;
  private joinedNourrains: Nourrain[] | undefined
  private createdNourrains: Nourrain[] | undefined

  constructor(
    token: string,
    user: User,
    joinedNourrains: Nourrain[] | undefined,
    createdNourrains: Nourrain[] | undefined
  ) {
    this.token = token;
    this.user = user;
    this.joinedNourrains = joinedNourrains;
    this.createdNourrains = createdNourrains;
  }
}
