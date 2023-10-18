import { Box } from "@components";
import { addEvent, dispatch } from "@utils";
import { useEffect, useState } from "react";
import { PageMain, PageHello, PageWord } from "../pages";

const Default = () => {
  const [route, setRoute] = useState(window.location.hash?.replace("#", ""));

  useEffect(() => {
    const event = () => {
      setRoute(window.location.hash?.replace("#", ""));
    };

    window.addEventListener("hashchange", event, false);

    return () => {
      window.removeEventListener("hashchange", event);
    };
  }, []);

  useEffect(() => {
    return addEvent("route", (data) => {
      window.location.hash = data?.route;
      dispatch("drawer");
    });
  }, []);

  return (
    <Box
      defFlex
      grow
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 4,
        boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
        p: 1,
      }}
    >
      {(route === "logo" || !route) && <PageMain />}
      {route === "home" && <PageHello />}
      {route === "portfolio" && <PageWord />}
    </Box>
  );
};

export default Default;
