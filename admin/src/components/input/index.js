import { memo } from "react";
import { IconButton } from "..";

const { TextField } = require("@mui/material");

function areEqual(prev, next) {
  return (
    prev.value === next.value &&
    prev.onChange === next.onChange &&
    prev.caption === next.caption &&
    prev.name === next.name &&
    prev.startComponent === next.startComponent &&
    prev.endComponent === next.endComponent &&
    prev.clear === next.clear
  );
}

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
    ...other
  } = props;

  let clearComponent = clear ? (
    <IconButton
      name="clearInput"
      sxIcon={{ fontSize: 18 }}
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
}, areEqual);

export { Default as Input };
