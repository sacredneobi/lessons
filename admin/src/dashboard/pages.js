import { Box } from "@components";
import { addEvent, dispatch, getHash, setHash } from "@utils";
import { useEffect, useState } from "react";
import { PageMain, PageGood, PageOrder, PageSettings } from "../pages";
import { LangContext } from "@context/lang";

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
      {(route === "main" || !route) && (
        <LangContext lang="main">
          <PageMain />
        </LangContext>
      )}
      {route === "good" && (
        <LangContext lang="good">
          <PageGood />
        </LangContext>
      )}
      {route === "order" && (
        <LangContext lang="order">
          <PageOrder />
        </LangContext>
      )}
      {route === "settings" && (
        <LangContext lang="setting">
          <PageSettings />
        </LangContext>
      )}
    </Box>
  );
};

export default Default;
