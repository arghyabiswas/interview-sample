
export class User{
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    expires: Date;
    issued: Date;
    token_type: string;
    displayName: string;
}

export class Employee{
    id:string;
    name:string;
    salary:number;
    managerName:string;
}