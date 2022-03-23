import { Helper } from "common/helper";
import { ResponseHandler } from "common/response.handler";
import { BookDomainModel } from "domain.types/book/book.domain.model";
import express from 'express';
import { body,param, validationResult } from "express-validator";

export class BookValidator {
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
    
    static create = async (request: express.Request, response: express.Response): Promise<BookDomainModel> => {
        try {
            await body('id').trim().run(request);
            await body('Name').isString().notEmpty().trim().run(request);
            await body('Summary').optional().trim().run(request);
            await body('PublishedAt').notEmpty().trim().run(request);
            await body('AuthorId').isString().notEmpty().trim().run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createBookDomainModel: BookDomainModel = {
                id: request.body.id,
                Name:  request.body. Name,
                Summary:  request.body.Summary,
                PublishedAt:  request.body.Published,
                AuthorId: request.body.AuthorId
            };

            return createBookDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
}
