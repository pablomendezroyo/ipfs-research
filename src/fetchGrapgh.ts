import { request } from "graphql-request";
import { apiRemote, query } from "./constants";
import { LatestVersionItem, Repos } from "./types";
import { parseIpfs } from "./utils";

export async function fetchAllDnpsLatestVersions(): Promise<
  LatestVersionItem[]
> {
  const data: Repos = await request(apiRemote, query);
  const hashes = parseIpfs(data);
  //console.log(hashes);

  return hashes;
}
