import { Authorizer } from 'auth/authorizer';
import { ResponseHandler } from 'common/response.handler';
import express from 'express';
import { UserService } from 'services/user.service';
import { Loader } from 'startup/loader';

export class UserController {
    //#region member variables and constructors

    _service: UserService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(UserService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // request.context = 'User.create';
    
            const apiResponse = {
                name: 'rupali dinde',
                designation: 'software dev',
            };
    
            ResponseHandler.success(
                request,
                response,
                'User created!',
                200,
                {
                    entity: apiResponse,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
            
    };
}
