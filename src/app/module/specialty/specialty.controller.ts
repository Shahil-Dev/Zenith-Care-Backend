import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async(req: Request, res: Response)=>{
    try {
        const payload  = req.body

        const result = await SpecialtyService.createSpecialty(payload)
        res.status(201).json({
            success: true,
            message: 'Specialty created successfully',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating specialty'
        })
    }
}

export const SpecialtyController = {
    createSpecialty
}