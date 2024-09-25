import { UserData } from "./user-data.model";

export class LoginResponse {
    constructor(
      public user: UserData,
      public token: string
    ) {}
  }
  