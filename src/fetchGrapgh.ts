import { request } from "graphql-request";
import { apiRemote, query } from "./constants";
import { Repos } from "./types";
import { parseIpfs } from "./utils";

export async function fetchGraph() {
  const data: Repos = await request(apiRemote, query);
  const hashes = parseIpfs(data);
  //console.log(hashes);

  return hashes;
}
