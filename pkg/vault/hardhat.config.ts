import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-ignore-warnings';
import '@matterlabs/hardhat-zksync-solc';

import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import overrideQueryFunctions from '@balancer-labs/v2-helpers/plugins/overrideQueryFunctions';

// task(TASK_COMPILE).setAction(overrideQueryFunctions);

export default {
  solidity: {
    compilers: hardhatBaseConfig.compilers,
    overrides: { ...hardhatBaseConfig.overrides(name) },
  },
  networks: {
    zktestnet: {
      zksync: true,
      url: 'https://zksync2-testnet.zksync.dev',
    },
  },
  zksolc: {
    version: '1.2.0',
    compilerSource: 'binary',
    settings: {
      compilerPath: '/usr/local/bin/zksolc',
      optimizer: {
        enabled: true,
      },
    },
  },
};
