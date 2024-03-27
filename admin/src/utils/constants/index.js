import { useEffect } from "react";
import { useState } from "react";
import { addEvent } from "..";

const getHash = () =>
  window.location.hash?.replace?.("#", "")?.split?.("&")?.[0];

const setHash = (value) => (window.location.hash = value);

const event = () => {
  const [, ...other] =
    window.location.hash?.replace?.("#", "")?.split?.("&") ?? [];
  const data = other?.reduce?.((prev, item) => {
    const [key, value] = item.split("=");

    prev[decodeURI(key)] = decodeURI(value);

    return prev;
  }, {});

  return data ?? {};
};

const useParams = () => {
  const [params, setParams] = useState(event());

  useEffect(
    () => addEvent("hashchange", () => setParams(event()), window, false),
    []
  );

  return params;
};

export { getHash, setHash, useParams };
