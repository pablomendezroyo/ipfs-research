export interface Repos {
  repos: { lastVersion: { contentUri: string }; name: string }[];
}

export interface LatestVersionItem {
  hash: string;
  name: string;
}

export interface IpfsLsReturn {
  // depth: 1,
  name: string; // 'alice.txt',
  path: string; // 'QmVvjDy7yF7hdnqE8Hrf4MHo5ABDtb5AbX6hWbD3Y42bXP/alice.txt',
  // size: 11696,
  // cid: CID('QmZyUEQVuRK3XV7L9Dk26pg6RVSgaYkiSTEdnT2kZZdwoi'),
  type: string; // 'file',
  // mode: Number, // implicit if not provided - 0644 for files, 0755 for directories
  // mtime?: { secs: Number, nsecs: Number }
}

export interface ComposeVolumes {
  // volumeName: "dncore_ipfsdnpdappnodeeth_data"
  [volumeName: string]: {
    // Allowed to user
    external?: boolean | { name: string }; // name: "dncore_ipfsdnpdappnodeeth_data"
    // NOT allowed to user, only used by DAppNode internally (if any)
    name?: string; // Volumes can only be declared locally or be external
    driver?: string; // Dangerous
    driver_opts?:
      | { type: "none"; device: string; o: "bind" }
      | { [driverOptName: string]: string }; // driver_opts are passed down to whatever driver is being used, there's. No verification on docker's part nor detailed documentation
    labels?: { [labelName: string]: string }; // User should not use this feature
  };
}

export interface ComposeService {
  container_name: string; // "DAppNodeCore-dappmanager.dnp.dappnode.eth";
  image: string; // "dappmanager.dnp.dappnode.eth:0.2.6";
  volumes?: string[]; // ["dappmanagerdnpdappnodeeth_data:/usr/src/app/dnp_repo/"];
  ports?: string[];
  labels?: { [labelName: string]: string };
  env_file?: string[];
  // ipv4_address: "172.33.1.7";
  networks?: string[] | { [networkName: string]: { ipv4_address: string } };
  dns?: string; // "172.33.1.2";
  restart?: string; // "always";
  privileged?: boolean;
  cap_add?: string[];
  cap_drop?: string[];
  devices?: string[];
  network_mode?: string;
  command?: string;
  entrypoint?: string;
  // Logging
  logging?: {
    driver?: string;
    options?: {
      [optName: string]: string | number | null;
    };
  };
}

export interface Compose {
  version: string; // "3.4"
  // dnpName: "dappmanager.dnp.dappnode.eth"
  services: {
    [dnpName: string]: ComposeService;
  };
  networks?: {
    [networkName: string]: {
      external?: boolean;
      driver?: string; // "bridge";
      ipam?: { config: { subnet: string }[] }; // { subnet: "172.33.0.0/16" }
    };
  };
  volumes?: ComposeVolumes; // { dappmanagerdnpdappnodeeth_data: {} };
}
