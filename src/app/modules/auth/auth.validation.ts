import { z } from "zod";


const loginValidationSchema = z.object({
    body:z.object({
        id: z.string().optional(),
        mobileNo: z.string().optional(),
        password: z.string({required_error:"password must be required"})
    }).refine((data)=> data.id || data.mobileNo,{
        message:"Either id or mobileNo is required.",
        path: ["id","mobileNo"]
    })
})

const forgetPasswordValidationSchema = z.object({
    body:z.object({
        id: z.string({
            required_error:"User id is required"
        }),
    })
})

export const AuthValidation ={
    loginValidationSchema,
    forgetPasswordValidationSchema
}