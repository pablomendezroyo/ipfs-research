import { ipfsNode } from "./constants";
import { catString } from "./utils";

const CID = require("cids");
const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient(ipfsNode);

export async function lsIpfs(repos: { hash: string; name: string }[]) {
  repos.map(async (repo) => {
    for await (const file of ipfs.ls(repo.hash.substr(6), {
      timeout: 8 * 1000,
    })) {
      if (!file.path) continue;
      //console.log(file.path);
      const dockerComposeFiles = await catString(file.path);
      //console.log(dockerComposeFiles);
    }
  });
}

export async function catIpfs(path: string): Promise<Buffer> {
  const chunks: any = [];
  let data: Buffer = Buffer.concat(chunks);
  //console.log(path);
  if (path.includes("/docker-compose.yml")) {
    for await (const chunk of ipfs.cat(path, {
      timeout: 10 * 1000,
    })) {
      //console.log(chunk.toString("utf8"));
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  return data;
}
