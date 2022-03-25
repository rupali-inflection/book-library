
import { IAuthorRepo } from "database/repository.interfaces/author.repo.interface";
import { AuthorDomainModel } from "domain.types/author/auther.domain.model";
import { AuthorDetailsDto } from "domain.types/author/author.dto";

import { inject, injectable } from "tsyringe";

@injectable()
export class AuthorService {
    constructor(@inject('IAuthorRepo') private _authorRepo: IAuthorRepo) {}
    
    getById = async (authorId: string): Promise<AuthorDetailsDto> => {
        const authorDetailsDto: AuthorDetailsDto = await this._authorRepo.getById(authorId);

        return authorDetailsDto;
    };

    create = async (authorDetails: AuthorDomainModel): Promise<AuthorDetailsDto> => {
        //  const userRole: RoleDto = await this._roleRepo.getByName(Roles.User);
        //BookDetails.RoleId = userRole.id;
        const authorDetailsDto: AuthorDetailsDto = await this._authorRepo.createAuthor(authorDetails);

        return authorDetailsDto;
    };

    delete = async (authorId: string): Promise<boolean> => {
        return await this._authorRepo.delete(authorId);
    };
}
