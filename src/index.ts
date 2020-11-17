import { fetchAllDnpsLatestVersions } from "./fetchGrapgh";
import { catIpfs, lsIpfs, resolveExternalVols } from "./fetchIpfs";

/* fetchGraph()
  .then((hashes) => catIpfs(hashes))
  .then((dockerComposeContent) => console.log(dockerComposeContent))
  .catch((e) => console.log(e)); */

(async function () {
  const dnpsLatestVersions = await fetchAllDnpsLatestVersions();
  const results = await Promise.all(
    dnpsLatestVersions.map(async (dnpsLatestVersion) => {
      const name = dnpsLatestVersion.name;
      try {
        const externalVols = await resolveExternalVols(dnpsLatestVersion);
        return {
          name,
          externalVols,
        };
      } catch (e) {
        return {
          name,
          error: e,
        };
      }
    })
  );

  const errors = results.filter((res) => res.error);
  const hasVols = results.filter((res) => res.externalVols);
  const hasNot = results.filter((res) => !res.error && !res.externalVols);

  console.log("Errors \n=========");
  console.log(errors);

  console.log("hasNot \n=========");
  console.log(hasNot);

  console.log("hasVols \n=========");
  console.log(hasVols);
})();

// fetchAllDnpsLatestVersions()
//   .then((hashes) => lsIpfs(hashes))
//   .catch((e) => console.log(e));

//ipfs.version().then((r: any) => console.log(r));
