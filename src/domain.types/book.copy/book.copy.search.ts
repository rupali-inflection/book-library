import { BookCopyDetailsDto } from "./book.copy.dto";

export interface BookCopySearchFilters {
  
     BookId:string;
     BorrowerId:string;
     OrderBy: string;
     Order: string;
     PageIndex: number;
     ItemsPerPage: number;
 }
export interface BookCopySearchResults {
     TotalCount: number;
     RetrievedCount: number;
     PageIndex: number;
     ItemsPerPage: number;
     Order: string;
     OrderedBy: string;
     Items: BookCopyDetailsDto[];
 }