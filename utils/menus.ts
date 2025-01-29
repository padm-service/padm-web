import type { MenuItem } from "~/lib/type";

export const menus: MenuItem[] = [
    {
        id: "services",
        name: "数字模型",
        icon: "🫐",
        group: "console",
        roles: ["admin", "user"],
    },
    {
        id: "assistants",
        name: "数字专家",
        icon: "🙂",
        group: "console",
        roles: ["admin"],
    },
    {
        id: "knowledgeBase",
        name: "知识库",
        icon: "📖",
        group: "console",
        roles: ["admin"],
    },
    {
        id: "keys",
        name: "API Key",
        icon: "🗝️",
        group: "personal",
        roles: ["admin"],
    },
    {
        id: "monitor",
        name: "控制中心",
        icon: "🕵️",
        group: "console",
        roles: ["admin"],
    },
    {
        id: "knowledgeGraph",
        name: "知识图谱",
        icon: "📈",
        group: "console",
        roles: ["admin", "user"],
    },
];
