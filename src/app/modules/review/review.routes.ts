import { Router } from 'express';
import reviewController from './review.controller';
import validationRequest from '../../middlewares/validationRequest';
import ReviewValidationSchema from './review.validation';

const reviewRouter = Router();

reviewRouter.post(
  '/',
  validationRequest(ReviewValidationSchema),
  reviewController.createReview,
);

export default reviewRouter;
