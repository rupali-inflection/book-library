
import { IUserRepo } from 'database/repository.interfaces/user.repo.interface';
import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import User from '../models/user.model';

export class UserRepo implements IUserRepo {
    async createUser(userDetails: UserDomainModel): Promise<UserDetailsDto> {
        const entity = {
            Prefix: userDetails.Prefix,
            FirstName: userDetails.FirstName,
            MiddleName: userDetails.MiddleName,
            LastName: userDetails.LastName,
            Email: userDetails.Email,
            Password: userDetails.Password,
            RoleId: '',
        };

        const user: User = await User.create(entity);
        const dto: UserDetailsDto = await UserMapper.toDetailsDto(user);

        return dto;
    }
}
