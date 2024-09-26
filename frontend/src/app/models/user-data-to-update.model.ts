
export class UserDataToUpdate {
    constructor(
        public readonly username: string,
        public isAdminLocked: boolean | undefined,
        public isPasswordRestricted: boolean | undefined
    ) {}
}