import { Helper } from "common/helper";
import { ResponseHandler } from "common/response.handler";
import { AuthorDomainModel } from "domain.types/author/auther.domain.model";

import express from 'express';
import { body, param, validationResult } from "express-validator";

export class AuthorValidator {
    static get = async (request: express.Request, response: express.Response): Promise<string> => {
        try {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    static create = async (request: express.Request, response: express.Response): Promise<AuthorDomainModel> => {
        try {
            await body('id').trim().run(request);
            await body('FirstName').isString().notEmpty().trim().run(request);
            await body('LastName').isString().notEmpty().trim().run(request);
            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createAuthorDomainModel: AuthorDomainModel = {
              
                FirstName: request.body.FirstName,
                LastName:request.body. LastName
            };

            return createAuthorDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
}