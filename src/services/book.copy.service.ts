
import { inject, injectable } from "tsyringe";
import { IBookCopyRepo } from "../database/repository.interfaces/book.copy.repo.interface";
import { BookCopyDomainModel } from "../domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "../domain.types/book.copy/book.copy.dto";
import { BookCopySearchFilters, BookCopySearchResults } from "../domain.types/book.copy/book.copy.search";

@injectable()
export class BookCopyService {
    constructor(@inject('IBookCopyRepo') private _bookCopyRepo: IBookCopyRepo) {}
    
    getById = async (bookCopyId: string): Promise<BookCopyDetailsDto> => {
        const bookCopyDetailsDto: BookCopyDetailsDto = await this._bookCopyRepo.getById(bookCopyId);

        return bookCopyDetailsDto;
    };

    create = async (bookCopyDetails: BookCopyDomainModel): Promise<BookCopyDetailsDto> => {
        const bookCopyDetailsDto: BookCopyDetailsDto = await this._bookCopyRepo.createBookCopy(bookCopyDetails);

        return bookCopyDetailsDto;
    };

    search = async (filters: BookCopySearchFilters): Promise<BookCopySearchResults> => {
        const items = [];
        const results = await this._bookCopyRepo.search(filters);
        for await (const dto of results.Items) {
            items.push(dto);
        }
        results.Items = items;
        return results;
    };

    update = async (bookCopyId: string, bookCopyDomainModel: BookCopyDomainModel):
    Promise<BookCopyDetailsDto> => {
        return await this._bookCopyRepo.update(bookCopyId, bookCopyDomainModel);
    };

    delete = async (bookCopyId: string): Promise<boolean> => {
        return await this._bookCopyRepo.delete(bookCopyId);
    };
}
