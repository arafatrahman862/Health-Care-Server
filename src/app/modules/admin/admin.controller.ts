import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { AdminService } from "./admin.service";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]); // pagination and sorting
  const filters = pick(req.query, adminFilterableFields);
  const result = await AdminService.getAllFromDB(filters, options);
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
  const result = await AdminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient fetched successfully!",
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient fetched successfully!",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient deleted successfully!",
    // meta: result.meta,
    // data: result.data,
    data: result,
  });
});
const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.softDelete(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient deleted successfully!",
    // meta: result.meta,
    // data: result.data,
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  softDelete,
  updateIntoDB,
  deleteFromDB,
};
