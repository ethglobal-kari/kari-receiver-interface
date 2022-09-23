import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useMuiTheme } from "src/hooks/themes";
import { ClaimAirdropBg, LeftArrowIcon } from "src/svgs";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import getIpfsUrl from "src/utils/getIpfsUrl";
import { MessageInfo } from "src/@types/epns-message-info";
import { db } from "src/providers/FirebaseProvider";
import { getProofs, ProofInfo } from "src/helpers/claim";
import * as DistributorArtifact from "src/constants/abis/IMerkleDistributor.json";
import dayjs from "dayjs";
import { ArchiveIcon } from "src/svgs";
import { StartCheckbox } from "src/components/checkboxes/StarCheckbox";

const CampaignSection = ({
  campaign: { notification, message: messageInfo, cta, icon, image, sid },
  back,
}: {
  campaign: EpnsAPI.ParsedResponseType;
  back: () => void;
}) => {
  const theme = useMuiTheme();
  const { address } = useAccount();
  const message: MessageInfo = JSON.parse(messageInfo);
  const [proofInfo, setProofInfo] = useState<ProofInfo>();

  const { config } = usePrepareContractWrite({
    addressOrName: proofInfo?.contractAddress || "",
    contractInterface: DistributorArtifact.abi,
    functionName: "claim",
    args: [
      proofInfo?.index,
      proofInfo?.account,
      proofInfo?.amount,
      proofInfo?.proof,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const readList = JSON.parse(
    localStorage.getItem("readList") || "[]"
  ) as string[];

  useEffect(() => {
    if (!address) return;

    if (!readList.includes(sid))
      localStorage.setItem("readList", JSON.stringify([...readList, sid]));

    //* handle old message which have no sid
    const uid = sid === "" ? "empty-sid" : sid;
    db.collection(uid)
      .doc("read")
      .set({ [address]: address });
  }, [db, address, sid]);

  useEffect(() => {
    if (!address || !message.incentive.incentiveId) return;
    const effect = async () => {
      const result = await getProofs(message.incentive.incentiveId, address);
      setProofInfo(result);
    };
    effect();
  }, [address, message]);

  const onClickLink = useCallback(() => {
    if (!address) return;

    const uid = sid === "" ? "empty-sid" : sid;
    db.collection(uid)
      .doc("linkClick")
      .set({ [address]: address });

    window.open(cta, "_blank");
  }, [db, address, sid]);

  const onClaim = () => {
    if (write) write();
  };

  return (
    <Paper
      sx={{
        borderRadius: 8,
        width: "100%",
        height: "100%",
        boxShadow: "0px 10px 20px rgba(228, 228, 248, 0.2)",
      }}
    >
      <Box
        sx={{
          padding: "29px 0px 29px 17px",
          display: "flex",
          alignItems: "center",
          gap: "17px",
        }}
      >
        <LeftArrowIcon
          onClick={back}
          style={{
            cursor: "pointer",
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Typography variant="h3">{notification.title}</Typography>
      </Box>
      <Divider />
      <Box padding="29px 54px">
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <Box display="flex" gap="11px" alignItems="center">
            <Box
              component="img"
              src={message.protocol.logo}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 50,
                marginLeft: "-6px",
              }}
            />
            <Typography variant="h6">{message.protocol.name} :</Typography>
            <Typography variant="body1">0x1234...</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography mr="30px">
              {dayjs(message.timestamp).format("D MMM YYYY, HH:mm:ss")}
            </Typography>
            <IconButton sx={{ color: "#D0D6E2", marginRight: "8px" }}>
              <ArchiveIcon />
            </IconButton>
            <StartCheckbox />
          </Box>
        </Box>
        <Typography variant="body1">{notification.body}</Typography>
        <Typography variant="body1" component="span">
          More :{" "}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          sx={{
            color: "blue",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={onClickLink}
        >
          {cta}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginY: "24px",
          }}
        >
          <Box
            component="img"
            src={getIpfsUrl(message.attachment)}
            sx={{ maxWidth: "759px", borderRadius: 8 }}
          />
          <Box position="relative" maxWidth="760px">
            <ClaimAirdropBg />
            <Box
              sx={{
                position: "absolute",
                left: "190px",
                top: "45px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "33px",
                  fontWeight: 700,
                }}
              >
                {message.incentive.amountEach} USDT
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                right: "57px",
                top: "35px",
              }}
            >
              <Button
                variant="text"
                sx={{
                  width: 150,
                  background: proofInfo
                    ? theme.palette.gradient.linear.primary
                    : "#D9D9D9",
                  borderRadius: 8,
                }}
                onClick={onClaim}
              >
                <Typography variant="h6" color="white">
                  Claim
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CampaignSection;
