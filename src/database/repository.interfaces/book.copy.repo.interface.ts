import { BookCopyDomainModel } from "../../domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "../../domain.types/book.copy/book.copy.dto";
import { BookCopySearchFilters, BookCopySearchResults } from "../../domain.types/book.copy/book.copy.search";

export interface IBookCopyRepo {
    getById(bookCopyId: string): Promise<BookCopyDetailsDto>;
    
    createBookCopy(bookCopyDetails: BookCopyDomainModel): Promise<BookCopyDetailsDto>;

    search(filters: BookCopySearchFilters): Promise<BookCopySearchResults>;
    update(bookCopyId: string, bookCopyDomainModel: BookCopyDomainModel):
    Promise<BookCopyDetailsDto>;

    delete(bookCopyId: string): Promise<boolean>;

}
