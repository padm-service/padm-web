const nodemailer = require("nodemailer");

// 你的邮箱配置（这里以 Gmail 为例）
const transporter = nodemailer.createTransport({
    service: "gmail", // 邮箱服务商（Gmail, QQ, Outlook等）
    auth: {
        user: "690658643@qq.com", // 你的邮箱
        pass: "19990723wbl"   // 你的邮箱授权码
    }
});

// 发送邮件的函数
async function sendEmail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: '"你的名字" <your_email@gmail.com>', // 发件人
            to, // 收件人（可以是单个邮箱，也可以是多个）
            subject, // 邮件标题
            text, // 邮件正文（纯文本）
            html: `<p>${text}</p>` // 也可以使用 HTML 格式
        });

        console.log("邮件发送成功:", info.messageId);
    } catch (error) {
        console.error("邮件发送失败:", error);
    }
}

// 调用发送邮件函数
sendEmail("receiver@example.com", "测试邮件", "你好，这是 Node.js 发送的测试邮件！");
