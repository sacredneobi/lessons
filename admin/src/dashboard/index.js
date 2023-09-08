import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useState } from "react";

const MyButton = (props) => {
  const { name, open, ...other } = props;

  return (
    <MenuButton
      color="inherit"
      caption={
        <>
          <Icon name={name} />
          {open && (
            <Text
              caption={name}
              sx={{ fontSize: 14, textTransform: "capitalize" }}
            />
          )}
        </>
      }
      sx={{
        justifyContent: "flex-start",
        borderRadius: 2,
        minHeight: 40,
        minWidth: 0,
      }}
      {...other}
    />
  );
};

const Default = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box defFlex grow row>
      <Box
        defFlex
        sx={{ width: open ? 240 : 90, p: 2, transition: "width 100ms linear" }}
      >
        <Box
          defFlex
          sx={{
            p: 1,
            pt: 1.5,
            borderRadius: 4,
            boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
          }}
          grow
        >
          <Box defFlex sx={{ height: 32 }} ai row>
            <Icon name="logo" sx={{ fontSize: 42, width: 46, height: 46 }} />
            {open && <Text caption="LOGO" />}
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1} grow>
            <MyButton name="home" open={open} />
            <MyButton name="portfolio" open={open} />
          </Box>
          <Box defFlex>
            <MyButton
              name={open ? "close" : "open"}
              open={open}
              onClick={() => {
                console.log("close menu");
                setOpen((prev) => !prev);
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box grow />
    </Box>
  );
};

export { Default as Dashboard };
