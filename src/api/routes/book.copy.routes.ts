
import { BookCopyController } from '../../api/controllers/book.copy.controller';
import express from 'express';
import { Loader } from '../../startup/loader';



///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new BookCopyController();

    router.post('/',authenticator.authenticateUser,controller.create);
    router.get('/search', authenticator.authenticateUser,controller.search);
    router.get('/:id', authenticator.authenticateUser, controller.getById);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);
    router.put('/:id', authenticator.authenticateUser, controller.update);
    app.use('/api/v1/books-copy', router);
};
