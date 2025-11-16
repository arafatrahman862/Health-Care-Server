import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorController } from "./doctor.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  DoctorController.getAllFromDB
);

router.patch("/", DoctorController.updateIntoDB);


export const DoctorRoutes = router;
