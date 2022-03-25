import { BookDomainModel } from "domain.types/book/book.domain.model";
import { BookDetailsDto } from "domain.types/book/book.dto";
export interface IBookRepo {
    getById(bookId: string): Promise<BookDetailsDto>;

    createBook(bookDetails: BookDomainModel): Promise<BookDetailsDto>;
     
    delete(bookId: string): Promise<boolean>;

}
