import { ApiError } from "../../../../common/api.error";
import { Logger } from "../../../../common/logger";
import { IBookBorrowLogRepo } from "../../../../database/repository.interfaces/book.borrow.log.repo.interface";
import { BookBorrowLogDomainModel } from "../../../../domain.types/book.borrow.log/book.borrow.log.domain.model";
import { BookBorrowLogDetailsDto } from "../../../../domain.types/book.borrow.log/book.borrow.log.dto";
import { BookBorrowLogMapper } from "../mapper/book.borrow.log.mapper";
import BookBorrowLog from "../models/book.borrow.log.model";

export class BookBorrowLogRepo implements IBookBorrowLogRepo {
   
    getById = async (bookBorrowLogId: string): Promise<BookBorrowLogDetailsDto> => {
        const bookBorrowLog: BookBorrowLog = await BookBorrowLog.findOne({
            where: {
                id: bookBorrowLogId,
            },
        });

        const details: BookBorrowLogDetailsDto = await BookBorrowLogMapper.toDetailsDto(bookBorrowLog);

        return details;
    };

    async createBookBorrowLog(bookBorrowLogDetails: BookBorrowLogDomainModel):Promise<BookBorrowLogDetailsDto>    {

        const entity = {
            UserId:bookBorrowLogDetails.UserId,
            BookCopyId:bookBorrowLogDetails.BookCopyId,
            BorrowedAt:bookBorrowLogDetails.BorrowedAt
        };
    
        const bookBorrowLog: BookBorrowLog = await BookBorrowLog.create(entity);
        const dto: BookBorrowLogDetailsDto = await BookBorrowLogMapper.toDetailsDto(bookBorrowLog);
        return dto;
    }

    update = async (bookBorrowLogId: string, bookBorrowLogDomainModel: BookBorrowLogDomainModel):
    Promise<BookBorrowLogDetailsDto> => {
        try {
            const bookBorrowLog = await BookBorrowLog.findByPk(bookBorrowLogId);

            if (bookBorrowLogDomainModel.UserId != null) {
                bookBorrowLog.UserId = bookBorrowLogDomainModel.UserId;
            }
            if (bookBorrowLogDomainModel.BookCopyId != null) {
                bookBorrowLog.BookCopyId = bookBorrowLogDomainModel.BookCopyId;
            }
            if (bookBorrowLogDomainModel.BorrowedAt != null) {
                bookBorrowLog.BorrowedAt = bookBorrowLogDomainModel.BorrowedAt;
            }
    
            await bookBorrowLog.save();

            const dto = BookBorrowLogMapper.toDetailsDto(bookBorrowLog);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    async delete(bookBorrowLogId: string): Promise<boolean>  {
        try {
            const deleted = await BookBorrowLog.destroy({ where: { id:bookBorrowLogId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
