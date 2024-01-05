import {
  Box,
  IconButton,
  IconButtonCreate,
  Table,
  Stack,
  IconButtonReload,
} from "@components";
import { useCallback, useEffect, useState } from "react";
import useRenderRow from "./row";
import Dialog from "./dialog";
import { useGoodGet } from "@api";

const langBase = "goods";

const Default = () => {
  const [page, setPage] = useState(0);

  const [callbackGet, loading, rows] = useGoodGet(50, langBase);

  useEffect(() => {
    callbackGet({ page });
  }, [callbackGet, page]);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      setPage(page);
    },
    []
  );

  const handleOnFilter = useCallback(
    (props) => (
      <Stack>
        <IconButtonReload langBase={langBase} />
        <IconButtonCreate {...props} langBase={langBase} />
        <IconButton name="filter" {...props} />
      </Stack>
    ),
    []
  );

  const handelOnRender = useRenderRow();

  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        name="goods"
        sx={{ flexGrow: 1 }}
        items={rows}
        topButtons={handleOnFilter}
        pageCount={rows?.totalPage}
        onItemRender={handelOnRender}
        onChangePage={handleOnChangePage}
        langBase={langBase}
        loading={loading}
      />
      <Dialog langBase={langBase} />
    </Box>
  );
};

export { Default as PageMain };
