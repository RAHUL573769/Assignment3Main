import { Router } from "express";
import courseController from "./course.controller";
import validationRequest from "../../middlewares/validationRequest";
import CourseValidationSchema from "./course.validation";

const courseRouter = Router();

courseRouter.post(
  "/",
  validationRequest(CourseValidationSchema),
  courseController.createCourse
);

courseRouter.get("/best", courseController.getBestCourse);

export default courseRouter;
