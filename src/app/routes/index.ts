import { Router } from "express";
import routes from "../constants/routes";
import courseController from "../modules/course/course.controller";

const globalRouter = Router();

routes.forEach((route) => {
  globalRouter.use(route.path, route.router);
});

globalRouter.get("/courses", courseController.retrieveAllCourse);
globalRouter.put("/courses/:courseId", courseController.updateCourse);
globalRouter.get(
  "/courses/:courseId/reviews",
  courseController.getCourseWithReview
);
export default globalRouter;
