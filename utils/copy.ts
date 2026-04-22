import { toast } from 'vue-sonner';
export async function copy(content: string) {
    //console.log(content)
    //console.log('Clipboard API 可用:', navigator.clipboard && window.isSecureContext)
    console.log('开始复制，内容长度:', content?.length);
    console.log('浏览器信息:', navigator.userAgent);
    console.log('是否安全上下文:', window.isSecureContext);
    console.log('是否有 Clipboard API:', !!navigator.clipboard);
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(content);
            toast.success('已复制');
        } else {
            //console.log('使用降级方案')
            // const textarea = document.createElement('textarea');
            // textarea.value = content;
            // textarea.style.position = 'fixed';
            // textarea.style.top = '0';
            // textarea.style.left = '0';
            // textarea.style.opacity = '0';
            // document.body.appendChild(textarea);
            //console.log('textarea 创建完成，开始复制');
            // textarea.focus();
            // textarea.select();
            // document.execCommand('copy');
            // document.body.removeChild(textarea);
            // toast.success('已复制');
            // console.log('尝试 execCommand...');
        const textarea = document.createElement('textarea');
        textarea.value = content;
        textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        console.log('execCommand 结果:', success ? '成功' : '失败');
        }
    } catch (error) {
        toast.error(' 复制失败，请手动复制');
    }
}