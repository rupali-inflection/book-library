export interface BookBorrowLogDomainModel {


    BorrowedAt: Date;

    ReturnAt: Date;

    BorrowedByUserId: string;

    BookCopyId:string;
}
