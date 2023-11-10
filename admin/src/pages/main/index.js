import { Box, IconButton, Table } from "@components";
import { useCallback, useState } from "react";

const testArr = (page = 0) => {
  const perPage = 50;

  return new Array(perPage).fill(1).map((_, index) => ({
    id: page * perPage + index,
    caption: `test ${page * perPage + index}`,
    caption2: `Количество элементов на страницу ${perPage}`,
  }));
};

const Default = () => {
  const [, setData] = useState(false);
  const [page, setPage] = useState(0);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      setPage(page);
    },
    []
  );

  const handelOnButtonRender = useCallback(() => {
    return <Box>TEST BOTTOM</Box>;
  }, []);

  const handelOnRender = useCallback(
    (data) => {
      return (
        <Box defFlex row jc="space-between" ai>
          <Box defFlex>
            <div>{data.caption}</div>
            <Box sx={{ fontSize: 12, color: "text.secondary" }}>
              {data.caption2}
            </Box>
          </Box>
          <IconButton
            name="filter"
            onClick={() => {
              setData((prev) => !prev);
            }}
          />
        </Box>
      );
    },
    [setData]
  );

  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        name="goods"
        sx={{ flexGrow: 1 }}
        items={testArr(page)}
        topButtons={<IconButton name="filter" />}
        pageCount={20}
        onItemRender={handelOnRender}
        onBottomRender={handelOnButtonRender}
        onChangePage={handleOnChangePage}
      />
    </Box>
  );
};

export { Default as PageMain };
