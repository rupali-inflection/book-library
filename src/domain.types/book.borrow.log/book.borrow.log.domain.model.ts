export interface BookBorrowLogDomainModel {
    id: string;

    BorrowedAt: Date;

    ReturnAt: Date;

    BorrowedByUserId: Date;

    BookcopyId:string;
}
