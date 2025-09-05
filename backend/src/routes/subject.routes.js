import express from "express";
import {
  addSubject,
  getSubject,
  getSubjectsData,
  removeSubject,
} from "../controllers/subject.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const subjectRouter = express.Router();

subjectRouter.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "paperPdf", maxCount: 1 },
  ]),
  addSubject
);
subjectRouter.delete("/:id", removeSubject);
subjectRouter.get("/getSubjects", getSubjectsData);
subjectRouter.get("/:id/getSubject", getSubject);

export { subjectRouter };
