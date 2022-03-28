import { UserValidator } from '../../api/validators/user.validator';
import express from 'express';
import { Authorizer } from '../../auth/authorizer';
import { ApiError } from '../../common/api.error';
import { ResponseHandler } from '../../common/response.handler';
import { UserDomainModel, UserLoginDetails } from '../../domain.types/user/user.domain.model';
import { UserDetailsDto } from '../../domain.types/user/user.dto';
import { UserService } from '../../services/user.service';
import { Loader } from '../../startup/loader';
import { BaseController } from './base.controller';



export class UserController extends BaseController {
    //#region member variables and constructors

    _service: UserService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(UserService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('User.GetByuserId', request, response);

            const useruserId: string = await UserValidator.get(request, response);

            const userdetails: UserDetailsDto = await this._service.getById(useruserId);

            ResponseHandler.success(
                request,
                response,
                'User Get by userId!',
                200,
                {
                    entity: userdetails,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('User.Search', request, response);

            const filters = await UserValidator.search(request,response);
           
            const searchResults = await this._service.search(filters);

            const count = searchResults.Items.length;

            const message =
                count === 0
                    ? 'No records found!'
                    : `Total ${count} user  details records retrieved successfully!`;
                    
            ResponseHandler.success(request, response, message, 200, {
                UserDetailsRecord : searchResults });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
               
    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            this.setContext('User.Create', request, response,false);
            const domainData: UserDomainModel = await UserValidator.create(request, response);

            const userdetails: UserDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'User created!',
                200,
                {
                    entity: userdetails,
                    
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    loginWithPassword = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // request.context = 'User.create';

            const domainData: UserLoginDetails = await UserValidator.loginWithPassword(request, response);

            const userdetails = await this._service.loginWithPassword(domainData);

            const message = `User '${userdetails.user.FirstName}' logged in successfully!`;

            const data = {
                AccessToken: userdetails.accessToken,
                User: userdetails.user,
            };

            ResponseHandler.success(
                request,
                response,
                message,
                200,
                {
                    entity: data,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('User.Update', request, response);

            const domainModel = await UserValidator.update(request);

            const userId: string = await UserValidator.get(request,response);
            const existingRecord = await this._service.getById(userId);
            if (existingRecord == null) {
                throw new ApiError(404, 'User record not found.');
            }

            const updated = await this._service.update(userId , domainModel);
            if (updated == null) {
                throw new ApiError(400, 'Unable to update user  record!');
            }

            ResponseHandler.success(request, response, 'User  record updated successfully!', 200, {
                User : updated,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('User.Delete', request, response);

            const useruserId: string = await UserValidator.delete(request, response);

            const deleted = await this._service.delete(useruserId);
            if (!deleted) {
                throw new ApiError(400, 'User  details cannot be deleted.');
            }

            ResponseHandler.success(
                request,
                response,
                'User  deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
}
