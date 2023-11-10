import { Popover } from "@mui/material";
import { Box, Button, IconButton } from "..";
import { useEffect, useState } from "react";
import { addEvent, dispatch } from "@utils";
import { useTable } from "@context";

const Default = (props) => {
  const { defStyle, onBottomRender, name } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const tableData = useTable();

  const [, setReload] = useState(false);

  useEffect(() => {
    const change = addEvent(`${name}.selectChange`, () => {
      setReload((prev) => !prev);
    });
    const clear = addEvent(`${name}.selectClear`, () => {
      setReload((prev) => !prev);
    });
    return () => {
      change();
      clear();
    };
  }, [name]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton name="setting" {...defStyle} onClick={handlePopoverOpen} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              boxShadow: (theme) => theme.shadows[24],
            },
          },
        }}
      >
        <Box defFlex gap sx={{ p: 1 }}>
          <Button
            caption="Снять выделения"
            disabled={Object.keys(tableData.selected ?? {}).length === 0}
            onClick={() => {
              dispatch(`${name}.selectClear`, {});
            }}
          />
          {typeof onBottomRender === "function" ? onBottomRender() : null}
        </Box>
      </Popover>
    </>
  );
};

export default Default;
