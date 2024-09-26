export class UserData {
  constructor(
    public readonly username: string,
    public IsAdminLocked: boolean,
    public IsPasswordRestricted: boolean
  ) {}
}
