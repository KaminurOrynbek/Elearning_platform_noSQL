import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  subscribeCourse,
  getYourProgress,
  aggregateCourseData,
  queryEfficiency
} from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/subscribe/:id", isAuth, subscribeCourse);
router.get("/progress/:id", isAuth, getYourProgress);

//route for aggregation
router.get("/course/aggregate", aggregateCourseData);

//route for query efficiency
router.get("/course/query-efficiency", queryEfficiency);

export default router;