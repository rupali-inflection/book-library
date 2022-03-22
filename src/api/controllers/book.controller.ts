import { Authorizer } from "auth/authorizer";
import { Loader } from "startup/loader";
import { BaseController } from "./base.controller";

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

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.getById', request, response);

            const userId: string = await BookValidator.get(request, response);

            const userdetails: UserDetailsDto = await this._service.getById(userId);

            ResponseHandler.success(
                request,
                response,
                'User get by id!',
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
        throw new Error('Method not implemented.');
    };

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            this.setContext('Book.create', request, response);
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
    