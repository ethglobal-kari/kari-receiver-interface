import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import type { FC } from "react";

export type TableData = {
  subject: string;
  audience: string;
  read: number;
  click: number;
  prizePool: number;
  claimed: number;
  totalAmount: number;
  timestamp: string;
};

type Props = {
  data: TableData[];
};

export const CampaignTable: FC<Props> = ({ data }) => {
  return (
    <Box>
      <TableContainer sx={{ maxWidth: 900 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "white" }}>
              <TableCell width={160}>
                <Typography variant="h6">Subject</Typography>
              </TableCell>
              <TableCell width={160} sx={{ borderRight: "1px solid #F2EFEC" }}>
                <Typography variant="h6">Audience</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Read</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Link Click</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Prize Pool</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Claimed</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Sent Date</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: "#F6F9FF",
                    ".MuiTableCell-root": {
                      borderBottom: "1px solid #F2EFEC",
                    },
                  }}
                >
                  <TableCell width={160}>
                    <Typography fontWeight="bold" noWrap>
                      {row.subject}
                    </Typography>
                  </TableCell>
                  <TableCell width={160} sx={{ borderRight: "1px solid #F2EFEC" }}>
                    <Typography fontWeight="bold" noWrap>
                      {row.audience}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: "#2263FF" }}>{row.read}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: "#2263FF" }}>{row.click}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: "#2263FF" }}>{row.prizePool}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: "#2263FF" }}>
                      {row.claimed}/{row.totalAmount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{dayjs(row.timestamp).format("DD MMM YYYY")}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
