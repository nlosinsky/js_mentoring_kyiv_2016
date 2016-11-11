export class Signup {
    constructor(
        public username: string,
        public password: any,
        public admin?: boolean
    ) {
        this.admin = false;
    }
}