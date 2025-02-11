export function convertDateTime(utcTime: string | any): string {
    if (utcTime) {
        const date = new Date(utcTime); return date.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    }
    else return "未知"

}
export function convertDate(utcTime: string | any): string {
    if (utcTime) {
        const date = new Date(utcTime); return date.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
        });
    }
    else return "未知"

}
