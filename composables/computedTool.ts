import type { Service, User } from "~/lib/type";
import type { OpenAPIObject } from "openapi3-ts/oas31";
export const useCapitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const toJson = (object: string) => {
  return JSON.parse(object);
}

export const toFormatJson = (object: any) => {
  return JSON.stringify(object, undefined, 2);

}
export function getTags(services: Service[]) {
  const S = new Set();
  for (const { schema } of services) {
    for (const { name } of schema?.tags ?? []) {
      S.add(name);
    }
  }
  return Array.from(S);
}

export function groupTags(tags: string[]) {
  return tags.reduce((G, tag) => {
    if (typeof tag !== 'string') return G;
    const [type, subtype] = tag.split('/');
    if (!subtype) return G;

    if (!G[type]) {
      G[type] = [];
    }
    G[type].push(subtype);
    return G;
  }, {} as Record<string, string[]>);
}

export function getServicesByTags(services: Service[], tags: string[]): Service[] {
  return services.filter((service) => {
    // 获取 Service 的 tags
    const serviceTags = service.schema?.tags ?? [];
    // 检查所有标签是否都被包含
    return tags.every((tag) => {
      return serviceTags.some((t: any) => t.name === tag);
    });
  });
}
export function getServicesByTitle(services: Service[], keyword: string): Service[] {
  return services.filter((service) => {
    // 获取 Service 的 tags
    const serviceTags = service.schema?.info?.title ?? "";
    // 检查所有标签是否都被包含
    return serviceTags.includes(keyword);
  });
}
const allow_methods = ["get", "post", "delete", "put", "patch"];
export async function group(schema: OpenAPIObject) {
  const groups: any = {};
  const endpoints: any = {};
  if (schema.paths)
    Object.entries(schema.paths).forEach(function ([path, path_object]) {
      Object.entries(path_object).forEach(function ([method, operation]) {
        if (allow_methods.includes(method)) {
          for (const tag of operation.tags ?? []) {
            if (!(tag in groups)) {
              groups[tag] = [];
            }
            if (operation.tags) {
              operation = { ...operation, method, path }
              groups[tag].push(operation);
              endpoints[operation.operationId] = operation;
            }
          }
        }
      });
    });
  return {
    ...schema,
    groups,
    operations: endpoints,
  };
}