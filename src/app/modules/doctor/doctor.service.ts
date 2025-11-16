import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";
import { doctorSearchableFields } from "./doctor.constant";
import { IDoctorUpdateInput } from "./doctor.interface";

const getAllFromDB = async (filters: any, options:IOptions)=>{
 const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

    const andConditions: Prisma.DoctorWhereInput[] = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: doctorSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map((key) => ({
          [key]: {
            equals: (filterData as any)[key],
          },
        })),
      });
    }
  
    const whereConditions: Prisma.DoctorWhereInput =
      andConditions.length > 0
        ? {
            AND: andConditions,
          }
        : {};
  
    const result = await prisma.doctor.findMany({
      skip,
      take: limit,
  
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  
    const total = await prisma.doctor.count({
      where: whereConditions,
    });
    return {
      meta: { 
        page,
        limit,
        total,
      },
      data: result,
    };
}

const updateIntoDB = async (id: string, payload: Partial<IDoctorUpdateInput>) => {
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: {
            id
        }
    })
};

export const DoctorService = {
  getAllFromDB,
  updateIntoDB,
};