import { Box, IconButton, Table } from "@components";
import { useCallback, useEffect, useState } from "react";
import useRenderRow from "./row";
import Dialog from "./dialog";
import { useGoodGet } from "@api";

const langBase = "goods";

const Default = () => {
  const [page, setPage] = useState(0);

  const [callbackGet, loading, rows] = useGoodGet(50);

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
    (props) => <IconButton name="filter" {...props} />,
    []
  );

  const handelOnRender = useRenderRow();

  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        name="goods"
        sx={{ flexGrow: 1 }}
        items={rows?.products?.map((item) => ({
          ...item,
          caption: item.title,
        }))}
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
