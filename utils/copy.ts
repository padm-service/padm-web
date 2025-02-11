import { toast } from 'vue-sonner';
export async function copy(content: string) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(content);
            toast.success('已复制');
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.top = '0';
            textarea.style.left = '0';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
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