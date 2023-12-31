import { IconButton } from "../iconButton";
import { memo } from "@utils";

import { TextField } from "@mui/material";

const Default = memo((props) => {
  const {
    caption,
    onChange,
    name,
    value,
    startComponent,
    endComponent,
    clear,
    sx,
    sxIcon,
    ...other
  } = props;

  other.multiline = other.rows > 0;

  let clearComponent = clear ? (
    <IconButton
      name="clearInput"
      sxIcon={{
        fontSize: 18,
        ...sxIcon,
        ...(other?.disabled && {
          color: ({ palette }) => palette.action.disabled,
        }),
      }}
      disabled={other?.disabled}
      onClick={(e) => {
        if (typeof onChange === "function") {
          onChange(name)(null);
        }
        e.stopPropagation();
      }}
    />
  ) : null;

  return (
    <TextField
      label={caption}
      variant="outlined"
      size="small"
      value={value ?? ""}
      {...other}
      onChange={(e) => {
        if (typeof onChange === "function") {
          onChange(name)(e?.target?.value);
        }
      }}
      sx={{
        "& .MuiInputBase-root": { pr: 0 },
        "& fieldset": { p: 1, pr: 0 },
        ...sx,
      }}
      InputProps={{
        startAdornment: startComponent,
        endAdornment: endComponent ? endComponent : clearComponent,
      }}
    />
  );
});

export { Default as Input };
