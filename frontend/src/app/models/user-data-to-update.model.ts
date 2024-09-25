
export class UserDataToUpdate {
    constructor(
        public readonly username: string,
        public password: string | undefined,
        public isAdminLocked: boolean | undefined,
        public isPasswordRestricted: boolean | undefined
    ) {}
}