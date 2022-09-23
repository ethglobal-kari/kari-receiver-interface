import { Checkbox } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";

import type { FC } from "react";
import type { CheckboxProps } from "@mui/material";

export const StartCheckbox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      icon={<StarBorder />}
      checkedIcon={<Star />}
      sx={{
        "&.Mui-checked": {
          color: "#f8cb6d",
        },
      }}
    />
  );
};
