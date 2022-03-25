export interface BookBorrowLogDetailsDto {
    id: string;

    BorrowedAt: Date;

    ReturnAt: Date;

    BorrowedByUserId: string;

    BookCopyId:string;
}
