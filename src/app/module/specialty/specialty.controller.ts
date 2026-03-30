import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const payload = req.body

        const result = await SpecialtyService.createSpecialty(payload)
        res.status(201).json({
            success: true,
            message: 'Specialty created successfully',
            data: result
        })

    } catch {
        res.status(500).json({
            success: false,
            message: 'Error creating specialty'
        })
    }
}

const getAllSpecialties = async (req: Request, res: Response) => {
    try {
        const result = await SpecialtyService.getAllSpecialties()
        res.status(200).json({
            success: true,
            message: 'Specialties retrieved successfully',
            data: result
        })
    } catch {
        res.status(500).json({
            success: false,
            message: 'Error retrieving specialties'
        })
    }
}

const getSpecialtyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await SpecialtyService.getSpecialtyById(id as string)
        res.status(200).json({
            success: true,
            message: 'Specialty retrieved successfully',
            data: result
        })
    } catch {
        res.status(500).json({
            success: false,
            message: 'Error retrieving specialty'
        })
    }
}

const updateSpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const payload = req.body
        const result = await SpecialtyService.updateSpecialty(id as string, payload)
        res.status(200).json({
            success: true,
            message: 'Specialty updated successfully',
            data: result
        })
    } catch {
        res.status(500).json({
            success: false,
            message: 'Error updating specialty'
        })
    }
}

const deleteSpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await SpecialtyService.deleteSpecialty(id as string)
        res.status(200).json({
            success: true,
            message: 'Specialty deleted successfully',
            data: result
        })
    } catch {
        res.status(500).json({
            success: false,
            message: 'Error deleting specialty'
        })
    }
}

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialty
}