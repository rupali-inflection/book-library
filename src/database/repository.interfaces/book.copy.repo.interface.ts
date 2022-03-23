import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";


export interface IBookCopyRepo {
    getById(bookCopyId: string): Promise<BookCopyDetailsDto>;
    // getUserHashedPassword(id: string): Promise<string>;
    // findOneUser(options: UserFindOptions): Promise<UserDetailsDto>;
    // findUsersByRoleId(id: string): UserDetailsDto[] | PromiseLike<UserDetailsDto[]>;
    createBookCopy(bookCopyIetails: BookCopyDomainModel): Promise<BookCopyDetailsDto>;

}
