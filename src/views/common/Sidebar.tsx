import {
  Box,
  Button,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useResponsive } from "src/hooks/useResponsive";

import type { DrawerProps } from "@mui/material";
import type { FC } from "react";
import { useMuiTheme } from "src/hooks/themes";
import { navbarHeight } from "./Layout";
import Link from "next/link";
import { AsteriskIcon, PenIcon, StarOutlinedIcon, TrashIcon } from "src/svgs";

type Props = {} & DrawerProps;

export const Sidebar: FC<Props> = (props) => {
  const { ...drawerProps } = props;
  const { isMobile } = useResponsive({ noSsr: true });
  const theme = useMuiTheme();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          border: "none",
          mt: `${navbarHeight}px`,
          borderRight: "2px solid",
          borderColor: "border.main",
        },
      }}
      ModalProps={{ keepMounted: true }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      {...drawerProps}
    >
      <Box height="100%" py={4.625}>
        <Box display="flex" justifyContent="center">
          <Link href="" passHref>
            <Button
              variant="text"
              sx={{
                width: 150,
                background: theme.palette.gradient.linear.primary,
                borderRadius: 8,
              }}
              startIcon={<PenIcon width={18} height={18} />}
            >
              <Typography variant="h6" color="white">
                Compose
              </Typography>
            </Button>
          </Link>
        </Box>
        <MenuList
          sx={{
            mt: 4,
            ".MuiMenuItem-root": {
              "&.active": {
                background: "#D3E3FD",
              },
              pl: 5.625,
              mr: 2.25,
              borderRadius: "0 8px 8px 0",
              ".MuiListItemIcon-root": { color: "#3876FF" },
            },
          }}
        >
          <MenuItem className="active">
            <ListItemIcon>
              <AsteriskIcon />
            </ListItemIcon>
            <ListItemText>Curate for you</ListItemText>
          </MenuItem>
          <MenuItem sx={{}}>
            <ListItemIcon>
              <StarOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Favorite</ListItemText>
          </MenuItem>
          <MenuItem sx={{}}>
            <ListItemIcon sx={{ pl: 0.25 }}>
              <TrashIcon />
            </ListItemIcon>
            <ListItemText>Trash</ListItemText>
          </MenuItem>
        </MenuList>

        <Typography variant="h4" sx={{ mt: 4, ml: 6 }}>
          Filter
        </Typography>

        <MenuList
          sx={{
            ".MuiMenuItem-root": {
              pl: 3.35,
              ml: 2.5,
              mr: 2.5,
              borderRadius: 8,
            },
          }}
        >
          <MenuItem className="active">
            <ListItemIcon>
              <Box
                component="img"
                src="https://cryptologos.cc/logos/aave-aave-logo.svg?v=023"
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText>AAVE</ListItemText>
          </MenuItem>
          <MenuItem sx={{}}>
            <ListItemIcon>
              <Box
                component="img"
                src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/uni.svg"
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText>Uniswap</ListItemText>
          </MenuItem>
          <MenuItem sx={{}}>
            <ListItemIcon>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: 24, height: 24, background: "black", borderRadius: 12 }}
              >
                <Box
                  component="img"
                  src="https://curve.fi/logo.png"
                  sx={{ width: 18, height: 18 }}
                />
              </Box>
            </ListItemIcon>
            <ListItemText>Curve</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
    </Drawer>
  );
};
