import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { PatientService } from "./patient.service";
import { patientFilterableFields } from "./patient.constant";


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]); // pagination and sorting
  const filters = pick(req.query, patientFilterableFields);
  const result = await PatientService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PatientService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient fetched successfully!",
    data: result,
  });
});


const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PatientService.softDelete(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient deleted successfully!",
    // meta: result.meta,
    // data: result.data,
    data: result,
  });
});

export const PatientController = {
  getAllFromDB,
  getByIdFromDB,
  softDelete,
};
