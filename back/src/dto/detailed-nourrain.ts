import { Nourrain } from "../models/nourrain.model";
import { User } from "../models/user.model";

export class DetailedNourrainDto {
  private nourrain: Nourrain;
  private isOwner: boolean;
  private owner: {
    firstname: string | null,
    lastname: string | null
  };
  private members: User[] | undefined;
  private waitingMembers: User[] | undefined;

  constructor(
    nourrain: Nourrain,
    isOwner: boolean,
    ownerFirstname: string | null,
    ownerLastname: string | null,
    members: User[] | undefined,
    waitingMembers: User[] | undefined,
  ) {
    this.nourrain = nourrain;
    this.isOwner = isOwner;
    this.owner = {
      firstname: ownerFirstname,
      lastname: ownerLastname
    };
    this.members = members;
    this.waitingMembers = waitingMembers;
  }

  public getNourrainId(): number {
    return this.nourrain.id;
  }
}
