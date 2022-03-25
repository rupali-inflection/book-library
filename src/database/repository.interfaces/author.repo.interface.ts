import { AuthorDomainModel } from "domain.types/author/auther.domain.model";
import { AuthorDetailsDto } from "domain.types/author/author.dto";


export interface IAuthorRepo {
    getById(authorId: string): Promise<AuthorDetailsDto>;
    
    createAuthor(authorDetails: AuthorDomainModel): Promise<AuthorDetailsDto>;

    delete(authorId: string): Promise<boolean>;

}
