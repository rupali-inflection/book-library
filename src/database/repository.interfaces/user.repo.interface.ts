import { UserDomainModel } from "domain.types/user/user.domain.model";
import { UserDetailsDto } from 'domain.types/user/user.dto';

export interface IUserRepo {
    getById(userId: string): Promise<UserDetailsDto>;
    getUserHashedPassword(id: string): Promise<string>;
    findOneUser(options: UserFindOptions): Promise<UserDetailsDto>;
    findUsersByRoleId(id: string): UserDetailsDto[] | PromiseLike<UserDetailsDto[]>;
    createUser(userDetails: UserDomainModel): Promise<UserDetailsDto>;

}
export class UserFindOptions {

    userId?: string;

    email?: string;

    isActive: boolean;
}
