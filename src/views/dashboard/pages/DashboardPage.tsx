import {
  Box,
  Card,
  Skeleton,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useMuiTheme } from "src/hooks/themes";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner, useToken } from "wagmi";
import { Channel } from "src/constants/epns";
import { checkSubscriberStatus, OptInChannel } from "src/helpers/optInChannel";
import { db } from "src/providers/FirebaseProvider";
import FeedsTable from "./FeedsTable";
import CampaignSection from "./CampaignSection";
import { useBalance } from "wagmi";

export const DashboardPage: NextPage = () => {
  const theme = useMuiTheme();
  const { address } = useAccount();
  const network = useNetwork()
  const { data: signer, isLoading: signerLoading } = useSigner();
  const [isLoading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<EpnsAPI.ParsedResponseType[]>();
  const [selectedCampaign, setSelectedCampaign] =
    useState<EpnsAPI.ParsedResponseType>();
  
  const token  = network.chain?.id === 42 ? '0x7c0046E7e98251c89c0A43971fbF5e20e70c00A4' : network.chain?.id === 80001 ? '0x661cDEBf1C046b633e077544d057Bde5C1df7eD8' : '0x661cDEBf1C046b633e077544d057Bde5C1df7eD8'
  const { data: fusdBalance } = useBalance({ addressOrName: address,  token, staleTime: 3_000 })

  const loadFeeds = useCallback(async (account: string) => {
    try {
      setLoading(true);
      const allFeeds: EpnsAPI.ParsedResponseType[][] = await Promise.all([
        // get notification
        EpnsAPI.user.getFeeds({
          user: account,
          limit: 30,
          env: Channel.env,
        }),
        // get spam
        EpnsAPI.user.getFeeds({
          user: account,
          limit: 30,
          env: Channel.env,
          spam: true,
        }),
      ]);
      const feeds = [...allFeeds[0], ...allFeeds[1]].filter(
        (v) => v.app === Channel.name
      ).sort((a, b) => {
        const aMsg = JSON.parse(a.message)
        const bMsg = JSON.parse(b.message)
        return bMsg.timestamp - aMsg.timestamp
      })
      
      console.log("feeds: ", feeds);
      setFeeds([...feeds]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const optInNewUser = useCallback(
    async (account: string) => {
      let isOptIn = await checkSubscriberStatus(account);

      if (!isOptIn) {
        console.log({ isOptIn });
        await OptInChannel(signer, account);
      }
    },
    [signer]
  );

  useEffect(() => {
    if (signerLoading || !address) return;
    optInNewUser(address);
  }, [signerLoading, optInNewUser]);

  useEffect(() => {
    if (!address) return;
    loadFeeds(address);
  }, [address, loadFeeds]);

  useEffect(() => {
    if (!address || !feeds) return;
    feeds.map((feed) => {
      const uid = feed.sid === "" ? "empty-sid" : feed.sid;
      db.collection(uid)
        .doc("see")
        .set({ [address]: address });
    });
  }, [feeds]);

  return (
    <Box py={3} px={3.5}>
      {!selectedCampaign && <Card
        sx={{
          width: 280,
          background: theme.palette.gradient.linear.primaryAlternate,
          boxShadow: "0px 10px 20px #E4E4F8",
          borderRadius: 18,
          color: "white",
        }}
      >
        <Box
          mx="25px"
          my="22px"
          sx={{
            ".MuiTypography-root": {
              fontFamily: "DM Sans",
            },
          }}
        >
          <Typography variant="h4">Total Earn</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mt={0.75}
          >
            <Typography>All time claimed</Typography>
            {fusdBalance?.formatted ? 
            <Typography variant="h3">$ {fusdBalance?.formatted}</Typography> :
            <Skeleton variant='rectangular' width={50} sx={{ borderRadius: 4 }} />
            }
          </Box>
        </Box>
      </Card>}
      <Box mt={3}>
        {!selectedCampaign && (
          <FeedsTable
            feeds={feeds}
            setCampaign={(c) => {
              setSelectedCampaign(c);
            }}
          />
        )}
        {selectedCampaign && (
          <CampaignSection
            campaign={selectedCampaign}
            back={() => setSelectedCampaign(undefined)}
          />
        )}
      </Box>
    </Box>
  );
};
