import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { SelectCheckbox } from "src/components/checkboxes/SelectCheckbox";
import { StartCheckbox } from "src/components/checkboxes/StarCheckbox";
import { ArchiveIcon, MarkAsUnreadIcon, TrashIcon } from "src/svgs";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import getIpfsUrl from "src/utils/getIpfsUrl";
import { MessageInfo } from "src/@types/epns-message-info";
import pinCampaign from "src/constants/pinCampaign";

const FeedsTable = ({
  feeds,
  setCampaign,
}: {
  feeds?: EpnsAPI.ParsedResponseType[];
  setCampaign: (c: any) => void;
}) => {
  const readList = JSON.parse(
    localStorage.getItem("readList") || "[]"
  ) as string[];

  return (
    <TableContainer sx={{ overflow: "visible" }}>
      <Table>
        <TableBody>
          {feeds &&
            [pinCampaign, ...feeds].map((campaign, index) => {
              const { message: messageInfo, sid, notification } = campaign;

              const isRead = readList.includes(sid);
              let message: MessageInfo = JSON.parse(messageInfo);

              return (
                <TableRow
                  key={index}
                  sx={{
                    background: isRead ? "#F6F9FF" : "white",
                    ".last-column-date": {
                      display: "unset",
                    },
                    ".last-column-action": {
                      display: "none",
                    },
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1)",
                      boxShadow: "0 4px 10px rgba(215, 226, 255, 1)", // TODO: opacity in figma is 0.2
                      ".last-column-date": {
                        display: "none",
                      },
                      ".last-column-action": {
                        display: "flex",
                      },
                    },
                    "& .MuiTableCell-root": {
                      py: 0.75,
                      px: 1.5,
                      borderBottom: "1px solid #D9D9D9",
                      "& .MuiTypography-root": {
                        fontWeight: isRead ? 400 : 600,
                      },
                    },
                    "&:first-child .MuiTableCell-root": {
                      borderTop: "1px solid #D9D9D9",
                    },
                  }}
                >
                  <TableCell
                    width={120}
                    sx={{ borderLeft: "1px solid #D9D9D9" }}
                  >
                    <Stack
                      spacing={1.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <SelectCheckbox />
                      <StartCheckbox />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={message.protocol.logo}
                      sx={{ width: 32, height: 32 }}
                    />
                  </TableCell>
                  <TableCell onClick={() => setCampaign(campaign)}>
                    <Typography
                      sx={{ ":hover": { textDecoration: "underline" } }}
                    >
                      {notification.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{notification.body}</Typography>
                  </TableCell>
                  <TableCell
                    width={130}
                    align="center"
                    sx={{ borderRight: "1px solid #D9D9D9" }}
                  >
                    <Typography className="last-column-date">
                      {dayjs(message.timestamp * 1000).format("DD MMM")}
                    </Typography>
                    <Stack className="last-column-action" direction="row">
                      <IconButton sx={{ color: "#333" }}>
                        <ArchiveIcon />
                      </IconButton>
                      <IconButton sx={{ color: "#333" }}>
                        <TrashIcon />
                      </IconButton>
                      <IconButton sx={{ color: "#333" }}>
                        <MarkAsUnreadIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedsTable;
