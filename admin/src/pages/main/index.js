import { Box, IconButton, Table } from "@components";
import { useCallback, useState } from "react";
import useRenderRow from "./row";
import Dialog from "./dialog";

const testArr = (page = 0) => {
  const perPage = 50;

  return new Array(perPage).fill(1).map((_, index) => ({
    id: page * perPage + index,
    caption: `test ${page * perPage + index}`,
    caption2: `Количество элементов на страницу ${perPage}`,
  }));
};

const langBase = "goods";

const Default = () => {
  const [page, setPage] = useState(0);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      setPage(page);
    },
    []
  );

  const handelOnRender = useRenderRow();

  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        name="goods"
        sx={{ flexGrow: 1 }}
        items={testArr(page)}
        topButtons={<IconButton name="filter" />}
        pageCount={20}
        onItemRender={handelOnRender}
        onChangePage={handleOnChangePage}
        langBase={langBase}
      />
      <Dialog langBase={langBase} />
    </Box>
  );
};

export { Default as PageMain };
