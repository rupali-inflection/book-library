import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";
import { DeletedAt } from "sequelize-typescript";
import BookCopy from "../models/book.copy.model";

export class BookCopyMapper {
    static toDetailsDto = async (entity: BookCopy): Promise<BookCopyDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: BookCopyDetailsDto = {
            id:entity.id,
            BookId:entity.BookId,
            CreatedAt: entity.CreatedAt,
            UpdatedAt: entity.UpdatedAt,
            DeletedAt: entity.DeletedAt,
        };

        return dto;
    };
}
