import { type OpenAPIObject, OpenApiBuilder } from 'openapi3-ts/oas31';
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
    level: number,
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
    schema: OpenAPIObject,
    tools: string,
    unit_price: string
};

export type Node = Base & {
    url: string,
    state: string,
    serviceId: string,
    name: string
};

export type Assistant = Base & {
    name: string,
    description: string,
    knowledge: string,
    level: number,
    services: Array<string>,
    model: string,
    system_prompt: string,
    temperature: number,
    top_p: number
}


