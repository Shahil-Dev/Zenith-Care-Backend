import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { CatchAsync } from "../../Shared/CatchAsync";
import { sendResponse } from "../../Shared/sendResponse";





//createSpecialty
const createSpecialty = CatchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await SpecialtyService.createSpecialty(payload)
        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'Specialty created successfully',
            data: result
        })
    }

)



//getAllSpecialties

const getAllSpecialties = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecialtyService.getAllSpecialties()
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialties retrieved successfully',
            data: result
        })
    }
)


const getSpecialtyById = CatchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await SpecialtyService.getSpecialtyById(id as string)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty retrieved successfully',
            data: result
        })
    }
)


const updateSpecialty = CatchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const payload = req.body
        const result = await SpecialtyService.updateSpecialty(id as string, payload)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty updated successfully',
            data: result
        })
    }
)

const deleteSpecialty = CatchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        await SpecialtyService.deleteSpecialty(id as string)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty deleted successfully'
        })
    }
)

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialty
}