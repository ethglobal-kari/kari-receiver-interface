import { Box, InputAdornment, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {} & TextFieldProps;

export const SearchInput: FC<Props> = ({ ...props }) => {
  return (
    <TextField
      variant="filled"
      sx={{
        width: 400,
        ".MuiFilledInput-root": {
          borderRadius: 8,
          backgroundColor: "#F7F7F7",
          "::before, ::after": { display: "none" },
          input: {
            padding: "0.75rem 1rem",
            "::placeholder": {
              opacity: 1,
              color: "rgba(182, 182, 182, 0.8)",
            },
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box color="#C3C3C3">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </Box>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
