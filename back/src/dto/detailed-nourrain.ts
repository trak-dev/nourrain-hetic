import { Nourrain } from "../models/nourrain.model";
import { User } from "../models/user.model";

export class DetailedNourrainDto {
  private nourrain: Nourrain;
  private owner: {
    firstname: string | null,
    lastname: string | null
  };
  private members: User[] | undefined;

  constructor(
    nourrain: Nourrain,
    ownerFirstname: string | null,
    ownerLastname: string | null,
    members: User[] | undefined,
  ) {
    this.nourrain = nourrain;
    this.owner = {
      firstname: ownerFirstname,
      lastname: ownerLastname
    };
    this.members = members;
  }

  public getNourrainId(): number {
    return this.nourrain.id;
  }
}
