import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = catchAsync(async (req: Request & {user?: IJWTPayload}, res: Response) => {
 const user = req.user;
const payload = req.body;
    const result = await DoctorScheduleService.insertIntoDB(user as IJWTPayload, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule created successfully",
    data: result,
  });
});

export const DoctorScheduleController = {
  insertIntoDB,
};
