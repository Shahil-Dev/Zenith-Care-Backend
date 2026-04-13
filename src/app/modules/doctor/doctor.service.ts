import { prisma } from "../../lib/prisma";
//get all doctors with their specialties and user information
const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return doctors;
};

//get doctor by id with their specialties and user information

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctor;
};

//update doctor by id
const updateDoctorById = async (id: string, data: any) => {
  const doctor = await prisma.doctor.update({
    where: { id },
    data: { ...data.doctor },
  });
  return doctor;
};

//delete doctor by id(soft delete)
const deleteDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return doctor;
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
