import * as z from 'zod'

export const zLoginForm = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    secret: z.string()
        .min(8, { message: '密码长度至少为 8 个字符' })
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).*$/,
            { message: '密码必须包含至少一个字母和一个数字' }
        )
});

export type LoginForm = z.infer<typeof zLoginForm>;

export const zRegisterForm = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    secret: z.string()
        .min(8, { message: '密码长度至少为 8 个字符' })
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).*$/,
            { message: '密码必须包含至少一个字母和一个数字' }
        ),
    confirmSecret: z.string()

}).refine((data) => data.secret === data.confirmSecret, {
    message: "两次输入的密码不一致",
    path: ["confirmSecret"],
});
export type RegisterForm = z.infer<typeof zRegisterForm>;

export const zKeyForm = z.object({
    purpose: z.string()
});
export type KeyForm = z.infer<typeof zKeyForm>;

export const zNodeForm = z.object({
    url: z.string().url(),
    name: z.string(),
});
export type NodeForm = z.infer<typeof zNodeForm>;

export const zAssistantForm = z.object({
    name: z.string(),
    description: z.string(),
});
export type AssistantForm = z.infer<typeof zAssistantForm>;


