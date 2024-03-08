import { useEffect } from "react";
import { Box, Table } from "@components";
import useRenderRow from "./row";
import Dialog from "./dialog";
import { useGoodGet } from "@api";

const Default = () => {
  const { callbackGet, ...other } = useGoodGet(50);

  useEffect(() => {
    callbackGet();
  }, [callbackGet]);

  const handelOnRender = useRenderRow();

  return (
    <Box name="main" defFlex center sx={{ width: 1, height: 1 }}>
      <Table {...other} onItemRender={handelOnRender} />
      <Dialog />
    </Box>
  );
};

export { Default as PageMain };
