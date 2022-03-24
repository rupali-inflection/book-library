// import { IUserRepo } from "database/repository.interfaces/user.repo.interface";
// import { UserDetailsDto } from "domain.types/user/user.dto";

// export class BookBorrowLogRepo implements IUserRepo {
//     // search = async (): Promise<RoleDto[]> => {
//     //     try {
//     //         const role: Role[] = await Role.findAll();
//     //         const dto: RoleDto[] = role.map((userRole) => RoleMapper.toDto(userRole));
//     //         return dto;
//     //     } catch (error) {
//     //         Logger.instance().log(error.message);
//     //         throw new ApiError(500, error.message);
//     //     }
//     // };

//     create = async (userEntity: any): Promise<UserDetailsDto> => {
//         try {
//             const entity = {
//                 RoleName: uEntity.RoleName,
//             };
//             const role: Role = await Role.create(entity);
//             const dto = RoleMapper.toDto(role);
//             return dto;
//         } catch (error) {
//             Logger.instance().log(error.message);
//             throw new ApiError(500, error.message);
//         }
//     };
