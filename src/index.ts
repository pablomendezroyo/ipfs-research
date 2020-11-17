import { fetchGraph } from "./fetchGrapgh";
import { catIpfs, lsIpfs } from "./fetchIpfs";

/* fetchGraph()
  .then((hashes) => catIpfs(hashes))
  .then((dockerComposeContent) => console.log(dockerComposeContent))
  .catch((e) => console.log(e)); */

fetchGraph()
  .then((hashes) => lsIpfs(hashes))
  .catch((e) => console.log(e));

//ipfs.version().then((r: any) => console.log(r));
