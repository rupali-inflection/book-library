import { Helper } from "../../common/helper";
import { ResponseHandler } from "../../common/response.handler";
import { BookCopyDomainModel } from "../../domain.types/book.copy/book.copy.domain.model";
import express from 'express';
import { body, oneOf, param, query, validationResult } from 'express-validator';
import { BookCopySearchFilters } from "domain.types/book.copy/book.copy.search";

export class BookCopyValidator {
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
    
    static create = async (request: express.Request, response: express.Response): Promise<BookCopyDomainModel> => {
        try {
            await body('id').trim().run(request);
            await body('BookId').isString().notEmpty().trim().run(request);
 
            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createBookCopyDomainModel: BookCopyDomainModel = {
                BookId: request.body.BookId,
            };

            return createBookCopyDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    static search = async (request: express.Request, response: express.Response): Promise<BookCopySearchFilters> => {

        try {

            await query('BorrowerId').optional()
                .trim()
                .escape()
                .run(request);

            await query('BookId').optional()
                .trim()
                .escape()
                .run(request);

            await query('orderBy').optional()
                .trim()
                .escape()
                .run(request);

            await query('order').optional()
                .trim()
                .escape()
                .run(request);

            await query('pageIndex').optional()
                .isInt()
                .trim()
                .escape()
                .run(request);

            await query('itemsPerPage').optional()
                .isInt()
                .trim()
                .escape()
                .run(request);
            await query('full').optional()
                .isBoolean()
                .run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return BookCopyValidator.getFilter(request);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private static getFilter(request): BookCopySearchFilters {

        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;
        const itemsPerPage = request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: BookCopySearchFilters = {
            BorrowerId      : request.query.BorrowerId ?? null,
            BookId          : request.query . AuthorId ?? null,
            OrderBy         : request.query.orderBy ?? 'CreatedAt',
            Order           : request.query.order ?? 'descending',
            PageIndex       : pageIndex,
            ItemsPerPage    : itemsPerPage,
        };
        return filters;
    }
    
    static delete = async (request: express.Request, response: express.Response): Promise<string> => {
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
}
