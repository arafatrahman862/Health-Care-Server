import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";
import { patientSearchableFields } from "./patient.constant";


const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.patient.findMany({
    skip,
    take: limit,

    where: whereConditions,
    orderBy: 
      options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder} : { createdAt: "desc"}
    
  
  });

  const total = await prisma.patient.count({
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
};

const getByIdFromDB = async (
  id: string,
) => {
 const result = await prisma.patient.findUnique({
    where: {
        id,
        isDeleted: false
    }
 })
 return result;
};


const softDelete = async (id: string) => {
 return await prisma.patient.delete({
   where: {
     id,
   },
 });
};

export const PatientService = {
  getAllFromDB,
  getByIdFromDB,
  softDelete,
};
