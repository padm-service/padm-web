
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { ZodSchema } from 'zod'
import { toast } from 'vue-sonner';

export function useCustomForm<T extends object>(
    schema: ZodSchema<T>,
    customSubmit?: (values: T) => Promise<void> | void
) {
    const validationSchema = toTypedSchema(schema)
    const { handleSubmit, ...rest } = useForm<T>({ validationSchema })

    const onSubmit = handleSubmit((values: T) => {
        if (customSubmit) {
            return customSubmit(values)
        } else {
            toast.error("失败");
            // toast.success(JSON.stringify(values, null, 2))
        }
    })

    return {
        onSubmit,
        ...rest,
    }
}
