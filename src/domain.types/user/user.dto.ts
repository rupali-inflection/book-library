export interface UserDetailsDto {
    id: string;
    Prefix: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    RoleId:string;
    CreatedAt: Date;

    UpdatedAt: Date;

    DeletedAt: Date;
}

export interface UserMembershipDetailsDto {
    id: string;
    UserId: string;
    ValidFrom: Date;
    ValidTill: Date
    CreatedAt: Date;

    UpdatedAt: Date;

    DeletedAt: Date;
}
