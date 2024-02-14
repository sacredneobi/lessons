import { Box } from "@components";
import { addEvent, dispatch, getHash, setHash } from "@utils";
import { useEffect, useState } from "react";
import { PageMain, PageGood, PageOrder, PageSettings } from "../pages";

const Default = () => {
  const [route, setRoute] = useState(getHash());

  useEffect(
    () => addEvent("hashchange", () => setRoute(getHash()), window, false),
    []
  );

  useEffect(
    () =>
      addEvent("route", (data) => {
        setHash(data?.route);
        dispatch("drawer");
      }),
    []
  );

  return (
    <Box
      name="TEST"
      grow
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 4,
        backgroundColor: "background.paper",
        backgroundImage: ({ palette }) => palette.background.sectionBackground,
        boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
        p: 1,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
      }}
    >
      {(route === "main" || !route) && <PageMain />}
      {route === "good" && <PageGood />}
      {route === "order" && <PageOrder />}
      {route === "settings" && <PageSettings />}
    </Box>
  );
};

export default Default;
