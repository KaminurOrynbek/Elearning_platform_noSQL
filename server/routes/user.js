import express from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  register,
  resetPassword,
  verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { getYourProgress } from "../controllers/course.js";
import { bulkOperations } from "../dbManipulations/bulkUser.js";
import { setUserField, unsetUserField, pushUserField, pullUserField } from "../dbManipulations/updateTechniques.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset", resetPassword);
router.get("/user/progress", isAuth, getYourProgress);

// Bulk operations
router.post("/user/bulk-operations", bulkOperations);

// Advanced update techniques
router.put("/user/set-field", setUserField);
router.put("/user/unset-field", unsetUserField);
router.put("/user/push-field", pushUserField);
router.put("/user/pull-field", pullUserField);

export default router;