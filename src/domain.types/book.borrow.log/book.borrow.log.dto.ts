export interface BookBorrowLogDetailsDto {
    id?: string;
    UserId?: string;

    BookCopyId?:string;

     BorrowedAt?: Date;

    ReturnedAt?: Date;
}
