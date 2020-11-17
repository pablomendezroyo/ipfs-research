import { gql } from "graphql-request";

export const ipfsNode = "http://ipfs.dappnode.io:5001";

export const apiRemote =
  "https://api.thegraph.com/subgraphs/name/dapplion/apm-dappnode-registries";
export const query = gql`
  {
    repos {
      name
      lastVersion {
        contentUri
      }
    }
  }
`;
