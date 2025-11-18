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

router.post("/suggestion", DoctorController.getAISuggestions);

router.get("/:id", DoctorController.getByIdFromDB);

router.patch("/:id",auth(UserRole.ADMIN, UserRole.DOCTOR) ,DoctorController.updateIntoDB);

router.delete("/:id", DoctorController.deleteFromDB);

router.delete("/soft/:id", DoctorController.softDelete);


export const DoctorRoutes = router;
