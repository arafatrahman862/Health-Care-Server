import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const scheduleForDoctor = catchAsync(async (req: Request & {user?: IJWTPayload}, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]); // pagination and sorting
const filters = pick(req.query, ["startDateTime", "endDateTime"])
const user = req.user;
  const result = await ScheduleService.scheduleForDoctor(user as IJWTPayload,filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule fetched successfully",
    data: result.data,
    meta: result.meta
  });
});


const deleteScheduleDromDB = catchAsync(async (req: Request, res: Response) => {
 const {id} = req.params;
 const result = await ScheduleService.deleteScheduleDromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDB,
  scheduleForDoctor,
  deleteScheduleDromDB,
};