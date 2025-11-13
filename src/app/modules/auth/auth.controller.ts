import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const {accessToken, refreshToken, needPasswordChange} = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000, // 1 hour
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000 * 24 * 90, // 90 days 
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User loggedin  successfully",
    data: {
        needPasswordChange,
    }
  });
});

export const AuthController = {
  login,
};
