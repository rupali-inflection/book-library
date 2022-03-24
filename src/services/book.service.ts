import { IAuthorRepo } from "database/repository.interfaces/author.repo.interface";
import { IBookRepo } from "database/repository.interfaces/book.repo.interface";
import { BookDomainModel } from "domain.types/book/book.domain.model";
import { BookDetailsDto } from "domain.types/book/book.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class BookService {
    constructor(@inject('IBookRepo') private _bookRepo: IBookRepo,@inject('IAuthorRepo') private _authorRepo: IAuthorRepo) {}
    
    getById = async (bookId: string): Promise<BookDetailsDto> => {
        const bookDetailsDto: BookDetailsDto = await this._bookRepo.getById(bookId);

        return bookDetailsDto;
    };

    create = async (bookDetails: BookDomainModel): Promise<BookDetailsDto> => {
        //  const userRole: RoleDto = await this._roleRepo.getByName(Roles.User);
        //BookDetails.RoleId = userRole.id;
        const bookDetailsDto: BookDetailsDto = await this._bookRepo.createBook(bookDetails);

        return bookDetailsDto;
    };
}
