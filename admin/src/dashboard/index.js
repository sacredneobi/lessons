import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useCallback, useEffect, useState } from "react";
import { addEvent, dispatch, useStore } from "@utils";
import { DashboardContext } from "@context";
import Pages from "./pages";

const MyButton = (props) => {
  const { name, open, sxCaption, sx, sxIcon, ...other } = props;

  const [active, setActive] = useState(
    window.location.hash?.replace("#", "") === name
  );

  useEffect(() => {
    const event = () => {
      setActive(window.location.hash?.replace("#", "") === name);
    };

    window.addEventListener("hashchange", event, false);

    return () => {
      window.removeEventListener("hashchange", event);
    };
  }, [name]);

  return (
    <MenuButton
      color="inherit"
      variant={active ? "contained" : "text"}
      disableElevation
      disableFocusRipple
      caption={
        <>
          <Icon name={name} sx={{ color: "text.secondary", ...sxIcon }} />
          <Text
            caption={name}
            sx={{
              fontSize: 14,
              textTransform: "capitalize",
              opacity: open ? 1 : 0,
              transition: "opacity 100ms linear",
              ...sxCaption,
            }}
          />
        </>
      }
      sx={{
        justifyContent: "flex-start",
        borderRadius: 2,
        minHeight: 40,
        minWidth: 0,
        p: 1,
        ...sx,
      }}
      onClick={() => {
        dispatch("route", { route: name });
      }}
      {...other}
    />
  );
};

const Default = () => {
  const [open, setOpen] = useStore("leftPane");

  const leftPanelOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  useEffect(() => {
    return addEvent("drawer", () => {
      if (document.body.clientWidth <= 100) {
        setOpen(false);
      }
    });
  }, [setOpen]);

  return (
    <Box defFlex grow row>
      <Box
        defFlex
        sx={{
          width: open ? 240 : 90,
          p: 2,
          transition: "width 200ms linear",
        }}
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
          <Box defFlex sx={{ height: 32 }} gap>
            <MyButton
              name="logo"
              open={open}
              sxIcon={{ color: "primary.light" }}
            />
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
              sxIcon={{ color: "primary.light" }}
              onClick={leftPanelOpen}
            />
          </Box>
        </Box>
      </Box>
      <Box defFlex grow sx={{ py: 2, pr: 2 }}>
        <Pages />
      </Box>
    </Box>
  );
};

const RootDefault = (props) => {
  return (
    <DashboardContext>
      <Default {...props} />
    </DashboardContext>
  );
};

export { RootDefault as Dashboard };
