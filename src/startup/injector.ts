
import { DatabaseInjector } from 'database/sql/database.injector';
import { DependencyContainer } from 'tsyringe';

export class Injector {
    static registerInjections(container: DependencyContainer) {
        DatabaseInjector.registerInjections(container);
    }
}
