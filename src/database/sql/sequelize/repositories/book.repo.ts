
import { ApiError } from 'common/api.error';
import { Logger } from 'common/logger';
import { IBookRepo } from 'database/repository.interfaces/book.repo.interface';
import { BookDomainModel } from 'domain.types/book/book.domain.model';

import { BookDetailsDto } from 'domain.types/book/book.dto';

import { BookMapper } from '../mapper/book.mapper';
import Book from '../models/book.model';



export class BookRepo implements IBookRepo {
    getById = async (bookId: string): Promise<BookDetailsDto> => {
        const book: Book = await Book.findOne({
            where: {
                id: bookId,
            },
        });

        const details: BookDetailsDto = await BookMapper.toDetailsDto(book);

        return details;
    };

    async createBook(bookDetails: BookDomainModel):Promise<BookDetailsDto>    {
        const entity = {
            id:bookDetails.id ,
            Name: bookDetails. Name,
            Summary: bookDetails.Summary,
            PublishedAt:bookDetails.PublishedAt,
            AuthorId:bookDetails.AuthorId
        };
    
        const book: Book= await Book.create(entity);
        const dto: BookDetailsDto = await BookMapper.toDetailsDto(book);
        return dto;
    }
}
