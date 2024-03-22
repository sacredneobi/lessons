import { IconButton } from "../iconButton";
import { memo } from "@utils";

import { TextField } from "@mui/material";
import { Box } from "../box";
import { useRef } from "react";
import { Icon } from "../icon";
import { Text } from "../text";

const setFocus = (name) => {
  const element = document.getElementById(name);
  if (element) {
    element.focus();
  }
};

const Default = memo((props) => {
  const {
    caption,
    onChange,
    onClear,
    name,
    value,
    startComponent,
    endComponent,
    clear,
    sx,
    sxIcon,
    type,
    nextField,
    onNextField,
    onCheckNext,
    langBase,
    clearLangBase,
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
      tabIndex={-1}
      disabled={other?.disabled}
      onClick={(e) => {
        if (typeof onChange === "function") {
          onChange(name)(null);
        }
        if (typeof onClear === "function") {
          onClear();
        }
        e.stopPropagation();
      }}
      help={{ name: "clear", langBase: clearLangBase ?? "global" }}
    />
  ) : null;

  return (
    <TextField
      label={
        <Text name={name} sx={{ fontSize: "unset" }} langBase={langBase} />
      }
      variant="outlined"
      size="small"
      value={type === "file" ? "" : value ?? ""}
      {...other}
      type={type}
      onKeyUp={(e) => {
        if (e.key === "Enter" && nextField && value) {
          if (
            typeof onNextField === "function" &&
            (!onCheckNext || onCheckNext?.())
          ) {
            onNextField();
          } else {
            setFocus(nextField);
          }
        }
        if (typeof other?.onKeyUp === "function") {
          other?.onKeyUp(e);
        }
      }}
      onChange={(e) => {
        if (typeof onChange === "function") {
          if (type === "file") {
            Array.prototype.forEach.call(e.target.files, (file) => {
              let reader = new FileReader();
              reader.onloadend = (...arg) => {
                const data = {
                  caption: file.name,
                  data: file,
                  type: file.type,
                  preview: reader.result,
                };
                onChange(name)(data);
              };

              reader.readAsDataURL(file);
            });
            e.target.value = "";
          } else {
            onChange(name)(e?.target?.value);
          }
        }
      }}
      sx={{
        "& .MuiInputBase-root": { pr: 0 },
        "& fieldset": { p: 1, pr: 0 },
        ...sx,
      }}
      inputProps={{ id: name }}
      InputProps={{
        startAdornment: startComponent,
        endAdornment: endComponent ? endComponent : clearComponent,
      }}
    />
  );
});

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0;
    return uuid.toString(16);
  });
}

const InputFile = (props) => {
  const {
    accept,
    clear,
    sxIcon,
    onChange,
    name,
    caption,
    value,
    multiple,
    langBase,
    ...other
  } = props;

  const ref = useRef();

  let clearComponent =
    clear && !multiple ? (
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
    <Box
      defFlex
      row
      ai
      gap
      sx={{
        pl: 0.5,
        cursor: "pointer",
        minHeight: 40,
        borderRadius: 1,
        border: ({ palette }) => `1px solid ${palette.action.disabled}`,
        "&:hover": {
          border: ({ palette }) => `1px solid ${palette.action.active}`,
        },
        transition: "all 200ms linear",
      }}
      onClick={() => {
        if (ref?.current) {
          ref.current.click();
        }
      }}
    >
      <input
        type="file"
        accept={accept}
        style={{ opacity: 0, display: "none" }}
        ref={ref}
        multiple={multiple}
        onChange={(e) => {
          const newData = value ?? [];

          Array.prototype.forEach.call(e.target.files, (file) => {
            if (multiple) {
              newData.push({
                id: uuid(),
                caption: file.name,
                data: file,
                type: file.type,
              });
              return;
            }

            let reader = new FileReader();
            reader.onloadend = (...arg) => {
              const data = {
                caption: file.name,
                data: file,
                type: file.type,
                preview: reader.result,
              };
              onChange(name)(data);
            };

            reader.readAsDataURL(file);
          });

          if (multiple) {
            onChange(name)(newData);
          }

          e.target.value = "";
        }}
      />
      <Icon
        name="file"
        sx={{ color: ({ palette }) => palette.text.secondary }}
      />
      <Text
        name={name}
        langBase={langBase}
        value={
          Array.isArray(value) && value?.length > 0
            ? value?.map((item) => item.caption)?.join(", ") ?? caption
            : value?.caption ?? caption
        }
        sx={{
          width: 1,
          ...(!value?.caption && {
            color: ({ palette }) => palette.text.secondary,
          }),
        }}
      />
      {clearComponent}
    </Box>
  );
};

export { Default as Input, InputFile };
