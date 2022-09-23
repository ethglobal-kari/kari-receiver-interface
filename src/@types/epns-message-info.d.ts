export type MessageInfo = {
  protocol: {
    name: string;
    logo: string;
    address: string;
  };
  incentive: {
    total: number;
    amountEach: number;
    usersCount: number;
    chainId: number;
    incentiveId: string;
    rootHash: string;
    txHash: string;
  };
  attachment: string;
  timestamp: number;
};