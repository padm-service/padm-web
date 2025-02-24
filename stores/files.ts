import type { File, FileUpload, PreSignedURL } from "~/lib/type";
import { toast } from 'vue-sonner';
import axios from 'axios';
const { post } = useApi();
export const fileStore = defineStore('file', () => {
    const fileUploadList = ref<FileUpload[]>([]);
    const upload = async (
        files: FileList,
        options: {
            urlPreSign: string
            urlFile: string
        }
    ) => {
        try {
            const length = files.length;
            await Promise.all(Array.from(files).map(async (file, i) => {
                const data = await post(options.urlPreSign,
                    {
                        method: "PUT",
                        name: file.name,
                        type: file.type,
                    }) as PreSignedURL;
                if (!data) {
                    throw new Error('Failed to get pre-signed URL')
                }
                axios.put(data.url, file, {
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.lengthComputable && progressEvent.total) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            fileUploadList.value[i - length + fileUploadList.value.length].progress = progress;
                        }
                    }
                }).then(response => {

                }).catch(error => {
                    toast.error("上传失败！");
                });
                const fileRecord = await post(options.urlFile, {
                    name: file.name,
                    type: file.type,
                    object_key: data.object_key,
                    method: "PUT",
                    size: file.size
                }) as File;
                fileUploadList.value[i - length + fileUploadList.value.length].fileId = fileRecord.id;
                fileUploadList.value[i - length + fileUploadList.value.length].url = fileRecord.pre_signed_url;
                return fileRecord;
            }))

        } catch (error) {
            toast.error("上传失败！");
            throw new Error(`Upload failed: ${error}`)
        }
    }
    return { fileUploadList, upload };
})