import { ipfsNode } from "./constants";
import { Compose, IpfsLsReturn, LatestVersionItem } from "./types";
import { catString } from "./utils";
import itAll from "it-all";
import yaml from "js-yaml";

const CID = require("cids");
const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient(ipfsNode);

export async function resolveExternalVols({
  hash,
  name,
}: LatestVersionItem): Promise<string[] | null> {
  try {
    const manifestRaw = await ipfsCatString(hash);
    const manifest = JSON.parse(manifestRaw);
    if (manifest.image && manifest.image.external_vol)
      return manifest.image.external_vol;
    else {
      return null;
    }
  } catch (e) {
    if (e.message.includes("node is a directory")) {
      const composeString = await ipfsCatString(`${hash}/docker-compose.yml`);
      const compose = yaml.safeLoad(composeString) as Compose;

      const externalVol: string[] = [];
      if (compose.volumes)
        for (const [volumeName, vol] of Object.entries(compose.volumes)) {
          if (vol.external) externalVol.push(volumeName);
        }

      return externalVol.length > 0 ? externalVol : null;

      // const files = await ipfsLs(hash);
      // if (files.find((file) => file.name === "docker-compose.yml")) {
      //   console.log({ name }, "has compose");
      // } else {
      //   console.log(
      //     { name },
      //     "does not has compose",
      //     files.map((file) => file.name).join(", ")
      //   );
      // }
    } else {
      throw e;
    }
  }
}

async function ipfsLs(hash: string): Promise<IpfsLsReturn[]> {
  return await itAll(ipfs.ls(hash, { timeout: 8 * 1000 }));
}

export async function lsIpfs(repos: { hash: string; name: string }[]) {
  await Promise.all(
    repos.map(async (repo) => {
      for await (const file of ipfs.ls(repo.hash.substr(6), {
        timeout: 8 * 1000,
      })) {
        if (!file.path) continue;
        //console.log(file.path);
        const dockerComposeFiles = await catString(file.path);
        //console.log(dockerComposeFiles);
      }
    })
  );
}

async function ipfsCatString(hash: string): Promise<string> {
  const buffer = await itAll(ipfs.cat(hash, { timeout: 10 * 1000 }));
  return buffer.toString();
}

export async function catIpfs(path: string): Promise<Buffer> {
  const chunks: any = [];
  let data: Buffer = Buffer.concat(chunks);
  //console.log(path);
  if (path.includes("/docker-compose.yml")) {
    for await (const chunk of ipfs.cat(path, { timeout: 10 * 1000 })) {
      //console.log(chunk.toString("utf8"));
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  return data;
}
