import type { MenuItem } from "~/lib/type";

export const menus: MenuItem[] = [
    {
        id: "services",
        name: "数字模型",
        icon: "🫐",
        group: "console",
        roles: ["admin", "user"],
        path: "/services",
    },
    // {
    //     id: "assistants",
    //     name: "数字专家",
    //     icon: "🧑‍🔬",
    //     group: "console",
    //     roles: ["admin"],
    //     path: "/assistants",
    // },
    {
        id: "knowledgeBase",
        name: "知识库",
        icon: "📖",
        group: "console",
        roles: ["admin"],
        path: "/knowledgeBase",
    },
    {
        id: "knowledgeGraph",
        name: "知识图谱",
        icon: "📈",
        group: "console",
        roles: ["admin", "user"],
        path: "/knowledgeGraph",
    },
];
export const manage: MenuItem[] = [
    {
        id: "setting",
        name: "账号设置",
        icon: "🔧",
        group: "personal",
        roles: ["admin", "user"],
        path: "/setting",
    },
    {
        id: "keys",
        name: "API Key",
        icon: "🗝️",
        group: "personal",
        roles: ["admin", "user"],
        path: "/keys",
    },
    {
        id: "bills",
        name: "费用账单",
        icon: "🧾",
        group: "personal",
        roles: ["admin", "user"],
        path: "/bills/month",
    },
    // {
    //     id: "users",
    //     name: "用户管理",
    //     icon: "🙂",
    //     group: "personal",
    //     roles: ["admin"],
    //     path: "/users",
    // },
    // {
    //     id: "monitor",
    //     name: "控制中心",
    //     icon: "🕵️",
    //     group: "personal",
    //     roles: ["admin"],
    //     path: "/monitor",
    // },
];
