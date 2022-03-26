import { UserDomainModel } from "../../domain.types/user/user.domain.model";
import { UserDetailsDto } from '../../domain.types/user/user.dto';
import { UserSearchFilters, UserSearchResults } from "../../domain.types/user/user.search.types";

export interface IUserRepo {
    getById(userId: string): Promise<UserDetailsDto>;
    getUserHashedPassword(id: string): Promise<string>;
    findOneUser(options: UserFindOptions): Promise<UserDetailsDto>;
    findUsersByRoleId(id: string): UserDetailsDto[] | PromiseLike<UserDetailsDto[]>;
    createUser(userDetails: UserDomainModel): Promise<UserDetailsDto>;
    search(filters: UserSearchFilters): Promise<UserSearchResults>;
    
    delete(userId: string): Promise<boolean>;

}
export class UserFindOptions {

    userId?: string;

    email?: string;

    isActive: boolean;
}
