import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";

const createPatient = catchAsync(async (req: Request, res: Response) =>{
    const result = await UserService.createPatient(req);
   
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Patient created successfully",
        data: result,
       
    })
} )

const createAdmin = catchAsync(async (req: Request, res: Response) =>{
    const result = await UserService.createAdmin(req);
   
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Admin created successfully",
        data: result,
       
    })
} )

const createDoctor = catchAsync(async (req: Request, res: Response) =>{
    const result = await UserService.createDoctor(req);
   
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Doctor created successfully",
        data: result,
       
    })
} )

const getAllFromDB = catchAsync(async (req: Request, res: Response) =>{
    const filters = pick(req.query,userFilterableFields) // searching and filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting
    const result = await UserService.getAllFromDB(
     filters, options
    );
   
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "User retrived successfully",
        meta: result.meta,
        data: result.data,
       
    })
} )

export const UserController = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllFromDB,
};