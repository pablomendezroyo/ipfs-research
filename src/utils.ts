import { catIpfs } from "./fetchIpfs";
import { Repos } from "./types";

export function parseIpfs(data: Repos) {
  return data.repos
    .filter((repo) => repo.lastVersion)
    .map((repo) => ({
      hash: repo.lastVersion.contentUri,
      name: repo.name,
    }));
}

export async function catString(path: string): Promise<string> {
  return catIpfs(path).then((file) => file.toString());
}
