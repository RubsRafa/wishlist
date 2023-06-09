import { Request, Response, NextFunction } from "express";
import { ValidationResult, Schema } from "joi";
import { TypesOfSchema } from "../protocols/itensProtocols";
import err from '../errors/index'

export function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as TypesOfSchema;
        const { error }: ValidationResult = schema.validate(body, { abortEarly: false });

        if (error) {
            const errors: string[] = error.details.map((d) => d.message);
            throw err.conflictErrorValidationSchema(errors);
        
        }
        next();
    }
}