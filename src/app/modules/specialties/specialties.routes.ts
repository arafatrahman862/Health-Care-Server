import express from "express";
import { SpecialtiesController } from "./specialties.controller";

const router = express.Router();

router.get(
  "/",
  SpecialtiesController.getAllFromDB
);

router.post("/", SpecialtiesController.inserIntoDB);

router.delete("/:id", SpecialtiesController.deleteFromDB);

export const SpecialtiesRoutes = router;
