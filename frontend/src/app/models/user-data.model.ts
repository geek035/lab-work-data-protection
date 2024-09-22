export class UserData {
  constructor(
    public readonly username: string,
    public isBlock: boolean,
    public isPasswordLimited: boolean
  ) {}
}
