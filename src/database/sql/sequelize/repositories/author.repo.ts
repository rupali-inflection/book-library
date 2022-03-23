import { IAuthorRepo } from "database/repository.interfaces/author.repo.interface";
import { AuthorDomainModel } from "domain.types/author/auther.domain.model";
import { AuthorDetailsDto } from "domain.types/author/author.dto";

import { AuthorMapper } from "../mapper/author.mapper";
import Author from "../models/autor.model";

export class AuthorRepo implements IAuthorRepo {
    
    getById = async (authorId: string): Promise<AuthorDetailsDto> => {
        const author: Author = await Author.findOne({
            where: {
                id: authorId,
            },
        });

        const details: AuthorDetailsDto = await AuthorMapper.toDetailsDto(author);

        return details;
    };

    async createAuthor(authorDetails: AuthorDomainModel):Promise<AuthorDetailsDto>    {
        const entity = {
            id:authorDetails.id ,
            FirstName: authorDetails.FirstName,
            LasttName: authorDetails.LastName,
        };
    
        const author: Author = await Author.create(entity);
        const dto: AuthorDetailsDto = await AuthorMapper.toDetailsDto(author);
        return dto;
    }
}