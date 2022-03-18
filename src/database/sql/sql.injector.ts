import { DependencyContainer } from 'tsyringe';
import { DatabaseConnector_Sequelize } from './sequelize/database.connector.sequelize';
import { UserRepo } from './sequelize/repositories/user.repo';

export class SQLInjector {
    static registerInjections(container: DependencyContainer) {
        container.register('IDatabaseConnector', DatabaseConnector_Sequelize);
        container.register('IUserRepo', UserRepo);
    }
}
