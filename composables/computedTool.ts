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
    for (const { name } of toJson(schema)?.tags ?? []) {
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