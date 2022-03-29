import { UserDetailsDto } from '../../../../domain.types/user/user.dto';
import User from '../models/user.model';

export class UserMapper {
    static toDetailsDto = async (entity: User): Promise<UserDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: UserDetailsDto = {
            id: entity.id,
            Prefix: entity.Prefix,
            FirstName: entity.FirstName,
            MiddleName: entity.MiddleName,
            LastName: entity.LastName,
            Email: entity.Email,
            RoleId:entity.RoleId,
            CreatedAt: entity.CreatedAt,
            UpdatedAt: entity.UpdatedAt,
            DeletedAt: entity.DeletedAt,
        };
        return dto;
    };
}
