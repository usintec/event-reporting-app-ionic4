//'surname', 'othername', 'gender', 'email', 'password', 'state', 'phone_no', 'address', 'role'
export class User {
    constructor(
        public id: string,
        public surname: string,
        public othername: string,
        public gender: string,
        public email: string,
        public password: string,
        public state: string,
        public phone_no: string,
        public address: string,
        public role: string
    ){

    }
}