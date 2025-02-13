import type { Service } from "~/lib/type";

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