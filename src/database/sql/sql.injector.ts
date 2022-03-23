
import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './sequelize/database.connector.sequelize';
import { BookCopyRepo } from './sequelize/repositories/book.copy.repo';
import { BookRepo } from './sequelize/repositories/book.repo';
import { RolePrivilegeRepo } from './sequelize/repositories/role privilege.repo';
import { UserRepo } from './sequelize/repositories/user.repo';
import { UserRoleRepo } from './sequelize/repositories/user.role.repo';

export class SQLInjector {
    static registerInjections(container: DependencyContainer) {
        container.register('IDatabaseConnector', DatabaseConnector_Sequelize);
        container.register('IUserRepo', UserRepo);
        container.register('IRoleRepo', UserRoleRepo);
        container.register('IRolePrivilegeRepo', RolePrivilegeRepo);
        container.register('IBookRepo', BookRepo);
        container.register('IBookCopyRepo', BookCopyRepo);
    }
}
