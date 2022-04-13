
import { BookDetailsDto } from '../../../../domain.types/book/book.dto';
import Book from '../models/book.model';


export class BookMapper {
    static toDetailsDto = async (entity: Book): Promise<BookDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: BookDetailsDto = {
            id:entity.id,
            Name: entity. Name,
            Summary: entity.Summary,
            PublishedAt: entity.PublishedAt,
            CreatedAt: entity.CreatedAt,
            UpdatedAt: entity.UpdatedAt,
            DeletedAt: entity.DeletedAt,
            AuthorId:entity.AuthorId
        };

        return dto;
    };
}
