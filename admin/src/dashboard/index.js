import { Box, Divider, MenuButton, Snackbar } from "@components";
import { useCallback, useEffect, useState } from "react";
import { addEvent, areEqualAlways, dispatch, getHash, useStore } from "@utils";
import { DashboardContext, LangContext, useRootSetting } from "@context";
import { memo } from "react";
import Pages from "./pages";
import Login from "./login";

const langBase = "dashboard";

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
      name={name}
      icon={name}
      sxIcon={sxIcon}
      sxText={{
        textTransform: "capitalize",
        opacity: open ? 1 : 0,
        transition: "opacity 100ms linear",
        ...sxCaption,
      }}
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

  const isOpen = open === "false" ? false : open;

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
          width: isOpen ? 240 : 90,
          p: 2,
          transition: "width 200ms linear",
        }}
      >
        <LangContext lang={langBase}>
          <Box
            defFlex
            sx={{
              p: 1,
              borderRadius: 4,
              backgroundColor: "background.paper",
              backgroundImage: ({ palette }) =>
                palette.background.sectionBackground,
              boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
            }}
            grow
          >
            <Box defFlex sx={{ height: 32 }} gap>
              <MyButton
                name="main"
                open={isOpen}
                sxIcon={{ color: "primary.light" }}
              />
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box defFlex gap={1} grow>
              <MyButton name="good" open={isOpen} />
              <MyButton name="order" open={isOpen} />
            </Box>
            <Box defFlex>
              <MyButton name="settings" open={isOpen} />
              <Divider sx={{ my: 1.5 }} />
              <MyButton
                name={isOpen ? "close" : "open"}
                open={isOpen}
                sxIcon={{ color: "primary.light" }}
                onClick={leftPanelOpen}
              />
            </Box>
          </Box>
        </LangContext>
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
    <Snackbar>
      <DashboardContext>
        {context?.userAuth ? <Default {...props} /> : <Login />}
      </DashboardContext>
    </Snackbar>
  );
};

export { RootDefault as Dashboard };
