import { AuthorDetailsDto } from "domain.types/author/author.dto";
import Author from "../models/autor.model";



export class AuthorMapper {
    
    static toDetailsDto = async (entity:Author): Promise<AuthorDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: AuthorDetailsDto = {
            id:entity.id,
            FirstName: entity.FirstName,
            LastName: entity.LastName,
            CreatedAt: entity.CreatedAt,
            UpdatedAt: entity.UpdatedAt,
            DeletedAt: entity.DeletedAt,
        };

        return dto;
    };
}
