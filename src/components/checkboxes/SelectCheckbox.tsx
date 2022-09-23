import { Checkbox } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

import type { FC } from "react";
import type { CheckboxProps } from "@mui/material";

export const SelectCheckbox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      checkedIcon={<CheckBoxOutlinedIcon />}
      sx={{
        ".MuiSvgIcon-root": {
          fontSize: "1.6rem",
        },
        "&.Mui-checked": {
          color: "#606f82",
        },
      }}
    />
  );
};
