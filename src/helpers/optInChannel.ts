import * as EpnsAPI from "@epnsproject/sdk-restapi";
import { Channel } from "src/constants/epns";

const checkSubscriberStatus = async (account: string) => {
  try {
    let subscriptions = await EpnsAPI.user.getSubscriptions({
      user: account,
      env: Channel.env,
    });

    subscriptions = subscriptions.map((sub: any) => sub.channel.toLowerCase());

    const status: boolean = subscriptions.includes(Channel.addr.toLowerCase());

    return status;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const OptInChannel = async (_signer: any, account :string) => {
  try {
    await EpnsAPI.channels.subscribe({
      signer: _signer,
      channelAddress: Channel.addr,
      userAddress: account,
      env: Channel.env,
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: (e) => {
        console.error("opt in error", e);
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export { checkSubscriberStatus, OptInChannel };
