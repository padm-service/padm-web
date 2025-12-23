import { toast } from 'vue-sonner';
export async function copy(content: string) {
    //console.log(content)
    //console.log('Clipboard API 可用:', navigator.clipboard && window.isSecureContext)
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(content);
            toast.success('已复制');
        } else {
            //console.log('使用降级方案')
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.top = '0';
            textarea.style.left = '0';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            //console.log('textarea 创建完成，开始复制');
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            toast.success('已复制');
        }
    } catch (error) {
        toast.error(' 复制失败，请手动复制');
    }
}