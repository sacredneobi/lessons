import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useCallback, useEffect, useState } from "react";
import { addEvent, areEqualAlways, dispatch, getHash, useStore } from "@utils";
import { DashboardContext, useRootSetting } from "@context";
import { memo } from "react";
import Pages from "./pages";
import Login from "./login";

const NewPages = memo(() => {
  return (
    <Box defFlex grow sx={{ py: 2, pr: 2 }}>
      <Pages />
    </Box>
  );
}, areEqualAlways);

const MyButton = (props) => {
  const { name, open, sxCaption, sx, sxIcon, ...other } = props;

  const [active, setActive] = useState(getHash() === name);

  useEffect(
    () =>
      addEvent(
        "hashchange",
        () => {
          setActive(getHash() === name);
        },
        window,
        false
      ),
    [name]
  );

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

  const context = useRootSetting();

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
              name="main"
              open={open}
              sxIcon={{ color: "primary.light" }}
            />
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1} grow>
            <MyButton name="good" open={open} />
            <MyButton name="order" open={open} />
          </Box>
          <Box defFlex>
            <MyButton
              name="logout"
              open={open}
              onClick={() => {
                context.userAuth = false;
              }}
            />
            <Divider sx={{ my: 1.5 }} />
            <MyButton
              name={open ? "close" : "open"}
              open={open}
              sxIcon={{ color: "primary.light" }}
              onClick={leftPanelOpen}
            />
          </Box>
        </Box>
      </Box>
      <NewPages />
    </Box>
  );
};

const RootDefault = (props) => {
  const [, setReload] = useState(false);

  const context = useRootSetting();

  useEffect(() => addEvent("auth", () => setReload((prev) => !prev)), []);

  return (
    <DashboardContext>
      {context?.userAuth ? <Default {...props} /> : <Login />}
    </DashboardContext>
  );
};

export { RootDefault as Dashboard };
