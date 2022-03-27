import { Authorizer } from "auth/authorizer";
import { BookService } from "../../services/book.service";
import { Loader } from "../../startup/loader";
import express from 'express';
import { BaseController } from "./base.controller";
import { BookDomainModel } from "domain.types/book/book.domain.model";
import { BookDetailsDto } from "domain.types/book/book.dto";
import { BookValidator } from "../../api/validators/book.validator";
import { ResponseHandler } from "../../common/response.handler";
import { ApiError } from "../../common/api.error";

export class BookController extends BaseController {
    //#region member variables and constructors

    _service: BookService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(BookService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion


    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.GetById', request, response);

            const bookId: string = await BookValidator.get(request, response);

            const bookdetails: BookDetailsDto = await this._service.getById(bookId);

            ResponseHandler.success(
                request,
                response,
                'Book get by id!',
                200,
                {
                    entity: bookdetails,
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
            await this.setContext('Book.Create', request, response);
            const domainData: BookDomainModel = await BookValidator.create(request, response);

            const bookdetails: BookDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'Book created!',
                200,
                {
                    entity: bookdetails,
                    
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.Delete', request, response);
     
            const bookId: string = await BookValidator.delete(request, response);
     
            const deleted = await this._service.delete(bookId);
            if (!deleted) {
                throw new ApiError(400, 'Book  details cannot be deleted.');
            }
     
            ResponseHandler.success(
                request,
                response,
                'Book  deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
     
}
