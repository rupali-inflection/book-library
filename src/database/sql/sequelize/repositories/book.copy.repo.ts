import { ApiError } from "../../../../common/api.error";
import { Logger } from "../../../../common/logger";
import { IBookCopyRepo } from "../../../../database/repository.interfaces/book.copy.repo.interface";
import { BookCopyDomainModel } from "../../../../domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "../../../../domain.types/book.copy/book.copy.dto";
import { BookCopyMapper } from "../mapper/book.copy.mapper";
import BookCopy from "../models/book.copy.model";
import { BookCopySearchFilters, BookCopySearchResults } from "../../../../domain.types/book.copy/book.copy.search";

export class BookCopyRepo implements IBookCopyRepo {
   
    getById = async (bookCopyId: string): Promise<BookCopyDetailsDto> => {
        const bookCopy: BookCopy = await BookCopy.findOne({
            where: {
                id: bookCopyId,
            },
        });

        const details: BookCopyDetailsDto = await BookCopyMapper.toDetailsDto(bookCopy);

        return details;
    };

    async createBookCopy(bookCopyDetails: BookCopyDomainModel):Promise<BookCopyDetailsDto>    {

        const entity = {
            BookId:bookCopyDetails.BookId,
        };
    
        const bookCopy: BookCopy= await BookCopy.create(entity);
        const dto: BookCopyDetailsDto = await BookCopyMapper.toDetailsDto(bookCopy);
        return dto;
    }

    search = async (filters: BookCopySearchFilters): Promise<BookCopySearchResults> => {
        try {
            const search = { where: {} };
            if (filters.BorrowerId != null) {
                search.where['BorrowerId'] = filters.BorrowerId;
            }
            if (filters.BookId !== null) {
                search.where['BookId '] = filters.BookId ;
        
            }
            let orderByColum = 'CreatedAt';
            if (filters.OrderBy) {
                orderByColum = filters.OrderBy;
            }
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];

            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const foundResults = await BookCopy.findAndCountAll(search);

            const dtos: BookCopyDetailsDto[] = [];
            for (const bookDetails of foundResults.rows) {
                const dto = await BookCopyMapper.toDetailsDto(bookDetails);
                dtos.push(dto);
            }

            const searchResults: BookCopySearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos,
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    async delete(bookCopyId: string): Promise<boolean>  {
        try {
            const deleted = await BookCopy.destroy({ where: { id:bookCopyId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
