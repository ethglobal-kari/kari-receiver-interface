import axios from "axios";

export type ProofInfo = {
  contractAddress: string;
  tokenAddress: string;
  chainId: number;
  account: string;
  index: number;
  amount: number;
  proof: string[];
};

export const getProofs = async (
  incentiveId: string,
  walletAddress: string
): Promise<ProofInfo> => {
  // walletAddress = "0x012ed55a0876Ea9e58277197DC14CbA47571CE28"; // TODO: change from mock
  const backendUrl = `https://kari-backend-urcger6jua-as.a.run.app/incentive/${incentiveId}/claim/${walletAddress}`;
  const response = await axios.get(backendUrl);
  return response.data;
};

// export const claim = async (proofInfo: ProofInfo) => {
//   const provider = ethers.providers.getDefaultProvider(RPC_URL);
//   const privateKey = PRIVATE_KEY || "";
//   const wallet = new ethers.Wallet(privateKey, provider);
//   const tokenContract = new ethers.ContractFactory(
//     TokenArtifact.abi,
//     TokenArtifact.bytecode.object,
//     wallet
//   );
//   const token = await tokenContract.deploy("Fake USD", "FUSD", 6);
//   console.log(`mock token: ${token.address}`);
//   const factoryContract = new ethers.ContractFactory(
//     FactoryArtifact.abi,
//     FactoryArtifact.bytecode.object,
//     wallet
//   );
//   const factory = await factoryContract.deploy();
//   console.log(`factory: ${factory.address}`);
//   const tx = await factory.createDistributor(
//     token.address,
//     rootHash,
//     totalAmount,
//     incentiveId
//   );
//   const response = await tx.wait();
//   const distributorAddress = response.events[0].args.distributor;
//   console.log(`distributor: ${distributorAddress}`);
//   const distributor = new ethers.Contract(
//     distributorAddress,
//     DistributorArtifact.abi,
//     wallet
//   );
//   // mint token to distributor
//   await token.mint(distributorAddress, totalAmount);
//   await distributor.claim(0, account, "10000000", proofs);
//   console.log(`isClaimed: ${await distributor.isClaimed(0)}`);
//   console.log(`claimed: ${await distributor.claimed()}`);
// };
