import { BookDomainModel } from "domain.types/book/book.domain.model";
import { BookDetailsDto } from "domain.types/book/book.dto";


export interface IBookRepo {
    // getById(userId: string): Promise<UserDetailsDto>;
    // getUserHashedPassword(id: string): Promise<string>;
    // findOneUser(options: UserFindOptions): Promise<UserDetailsDto>;
    // findUsersByRoleId(id: string): UserDetailsDto[] | PromiseLike<UserDetailsDto[]>;
    createBook(bookDetails: BookDomainModel): Promise<BookDetailsDto>;

}