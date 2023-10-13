import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useCallback, useEffect } from "react";
import { useStore } from "@utils";
import { DashboardContext, useDashboard } from "@context";

const MyButton = (props) => {
  const { name, open, ...other } = props;

  return (
    <MenuButton
      color="inherit"
      caption={
        <>
          <Icon name={name} />
          <Text
            caption={name}
            sx={{
              fontSize: 14,
              textTransform: "capitalize",
              opacity: open ? 1 : 0,
              transition: "opacity 100ms linear",
            }}
          />
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
  const [open, setOpen] = useStore("leftPane");

  const leftPanelOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const data = useDashboard();

  useEffect(() => {
    console.log(data);
    setTimeout(() => {
      data.token = "asdasd";
    }, 2000);
    setTimeout(() => {
      console.log(data);
    }, 4000);
  }, [data]);

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
          <Box defFlex sx={{ height: 32 }} ai row gap>
            <Icon name="logo" sx={{ fontSize: 42 }} />
            <Text
              caption="LOGO"
              sx={{
                opacity: open ? 1 : 0,
                transition: "opacity 100ms linear",
              }}
            />
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1} grow>
            <MyButton name="home" open={open} onClick={() => {}} />
            <MyButton name="portfolio" open={open} />
          </Box>
          <Box defFlex>
            <MyButton
              name={open ? "close" : "open"}
              open={open}
              onClick={leftPanelOpen}
            />
          </Box>
        </Box>
      </Box>
      <Box grow />
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
