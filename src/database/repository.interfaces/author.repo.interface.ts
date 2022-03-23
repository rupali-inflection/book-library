import { AuthorDomainModel } from "domain.types/author/auther.domain.model";
import { AuthorDetailsDto } from "domain.types/author/author.dto";


export interface IAuthorRepo {
    getById(authorId: string): Promise<AuthorDetailsDto>;
    // getUserHashedPassword(id: string): Promise<string>;
    // findOneUser(options: UserFindOptions): Promise<UserDetailsDto>;
    // findUsersByRoleId(id: string): UserDetailsDto[] | PromiseLike<UserDetailsDto[]>;
    createAuthor(authorDetails: AuthorDomainModel): Promise<AuthorDetailsDto>;

}