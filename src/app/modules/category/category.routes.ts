import { Router } from 'express';
import categoryController from './category.controller';
import CategoryValidationSchema from './category.validation';
import validationRequest from '../../middlewares/validationRequest';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.retrieveAllCategory);
categoryRouter.post(
  '/',
  validationRequest(CategoryValidationSchema),
  categoryController.createCategory,
);

export default categoryRouter;
