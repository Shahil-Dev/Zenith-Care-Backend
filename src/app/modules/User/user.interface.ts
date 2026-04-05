import { Gender } from "../../../generated/prisma/enums";

export interface ICreateDoctorPayload {
    password: string;
    // Add interface properties here
    doctor:{
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender: Gender;
    appointmentFee: number;
    qualifications: string;
    currentWorkplace?: string;
    designation: string;
}
specialtyId: string[];
    };
