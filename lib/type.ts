export type MenuItem = {
    id: string;
    name: string;
    icon: string;
    group?: string;
    roles?: string[];
    path: string;
};
type Base = {
    id: string,
    icon?: string,
    created_at?: string,
    updated_at?: string,
    userId?: string,
};
type BaseUnauthed = Omit<Base, "userId">;
export type User = BaseUnauthed & {
    name: string,
    email: string,
    level: string,
    balance: number,
    scope: string,
    state: string,
    permission: Array<string>
};
export type Token = {
    access_token: string,
    refresh_token?: string,
    expiry: number,
};
export type Key = Base & {
    prefix: string,
    secret?: string,
    secret_truncated: string,
    purpose: string,
    services: Array<string>,
};
export type Service = Base & {
    readme: string,
    level: number,
    schema: string,
    tools: string,
    unit_price: string
};

export type Node = Base & {
    url: string,
    state: string,
    serviceId: string,
    name: string
};



