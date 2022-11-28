import { Contract, ContractInterface, utils, providers } from 'ethers';
import * as zk from 'zksync-web3';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { getSigner } from './signers';
import { ZkSyncArtifact, Libraries, Param } from './types';
import localNetworksConfig from '/Users/mike/.hardhat/networks.json';

export async function deployZk(
  artifact: ZkSyncArtifact,
  args: Array<Param> = [],
  from?: SignerWithAddress,
  factoryDeps?: string[],
  libs?: Libraries
): Promise<Contract> {
  if (!args) args = [];
  if (!from) from = await getSigner();
  // if (libs) artifact = linkBytecode(artifact, libs);

  console.log(JSON.stringify(args));

  const zkProvider = new zk.Provider('https://zksync2-testnet.zksync.dev');
  const zkSigner = new zk.Wallet(localNetworksConfig.defaultConfig.accounts[0], zkProvider);

  const { ethers } = await import('hardhat');
  const factory = new zk.ContractFactory(
    artifact.abi as ContractInterface,
    artifact.evm.bytecode.object as utils.BytesLike,
    zkSigner
  );
  const deployment = await factory.deploy(...args, {
    customData: {
      factoryDeps,
    },
  });
  return deployment.deployed();
}
