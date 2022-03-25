import { Authorizer } from "auth/authorizer";
import { AuthorService } from "services/author.service";
import { Loader } from "startup/loader";
import { BaseController } from "./base.controller";
import express from 'express';
import { AuthorValidator } from "api/validators/author.validator";
import { AuthorDetailsDto } from "domain.types/author/author.dto";
import { ResponseHandler } from "common/response.handler";
import { AuthorDomainModel } from "domain.types/author/auther.domain.model";
import { ApiError } from "common/api.error";

export class AuthorController extends BaseController {
    //#region member variables and constructors

    _service: AuthorService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(AuthorService);
        this._authorizer = Loader.authorizer;
    }

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Author.GetById', request, response);

            const authorId: string = await AuthorValidator.get(request, response);

            const authordetails: AuthorDetailsDto = await this._service.getById(authorId);

            ResponseHandler.success(
                request,
                response,
                'Author get by id!',
                200,
                {
                    entity: authordetails,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };
  
    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Author.Create', request, response);
            const domainData: AuthorDomainModel = await AuthorValidator.create(request, response);

            const authordetails: AuthorDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'Author created!',
                200,
                {
                    entity: authordetails,
                    
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Author.Delete', request, response);

            const authorId: string = await AuthorValidator.delete(request, response);

            const deleted = await this._service.delete(authorId);
            if (!deleted) {
                throw new ApiError(400, 'Author  details cannot be deleted.');
            }

            ResponseHandler.success(
                request,
                response,
                'Author  deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
}
