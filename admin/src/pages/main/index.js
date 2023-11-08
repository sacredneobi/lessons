import { Box, IconButton, Table } from "@components";
import { useCallback, useState } from "react";

const testArr = new Array(50)
  .fill(1)
  .map((_, index) => ({ id: index, caption: `test ${index}` }));

const Default = () => {
  const [, setData] = useState(false);
  const [arr] = useState(testArr);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      console.log(name, page);
    },
    []
  );

  const handelOnRender = useCallback(
    (data) => {
      return (
        <Box defFlex row jc="space-between" ai>
          <div>{data.caption}</div>
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
        items={arr}
        topButtons={<IconButton name="filter" />}
        pageCount={20}
        onItemRender={handelOnRender}
        onChangePage={handleOnChangePage}
      />
    </Box>
  );
};

export { Default as PageMain };
