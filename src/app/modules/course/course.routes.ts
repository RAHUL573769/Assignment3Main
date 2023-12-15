import { Router } from 'express';
import courseController from './course.controller';
import validationRequest from '../../middlewares/validationRequest';
import CourseValidationSchema from './course.validation';

const courseRouter = Router();

courseRouter.post(
  '/',
  validationRequest(CourseValidationSchema),
  courseController.createCourse,
);

courseRouter.put('/:courseId', courseController.updateCourse);
courseRouter.get('/:courseId/review', courseController.getCourseWithReview);
courseRouter.get('/best', courseController.getBestCourse);
// courseRouter.get('/', courseController.retrieveAllCourse);
// Another router is created on globalRouter file. This router is retrieving all the data.

export default courseRouter;
