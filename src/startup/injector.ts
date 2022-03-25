
import { AuthInjector } from '../auth/auth.injector';
import { DatabaseInjector } from '../database/sql/database.injector';
import { DependencyContainer } from 'tsyringe';

export class Injector {
    static registerInjections(container: DependencyContainer) {
        AuthInjector.registerInjections(container);
        DatabaseInjector.registerInjections(container);
    }
}
