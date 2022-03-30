export interface UserDomainModel {
    Prefix: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    Password: string;
    RoleId:string;
}
export interface UserLoginDetails {
    Email: string;
    Password: string;
}


export interface UserMembershipDetails {
    UserId: string;
    ValidFrom: Date;
    ValidTill: Date
}
