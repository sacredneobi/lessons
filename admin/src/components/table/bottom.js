import { Pagination, Typography } from "@mui/material";
import { Box, IconButton } from "..";
import { useTable } from "@context";
import { useEffect, useState } from "react";
import { addEvent, dispatch } from "@utils";

const CountSelect = (props) => {
  const { name } = props;

  const tableData = useTable();
  const [, setReload] = useState(false);

  useEffect(
    () =>
      addEvent(`${name}.selectChange`, () => {
        setReload((prev) => !prev);
      }),
    [name]
  );

  const count = Object.keys(tableData?.selected ?? {}).length;

  return count > 0 ? (
    <Typography
      onClick={(e) => {
        dispatch(`${name}.selectClear`, {});
        setReload((prev) => !prev);
        tableData.selected = {};
        e.stopPropagation();
      }}
    >
      Выделенные элементы : {count}
    </Typography>
  ) : null;
};

const Default = (props) => {
  const { pageCount, sxFooter, name, onChangePage, defStyle } = props;

  return (
    <Box defFlex row jc="space-between" ai name="footer" sx={sxFooter}>
      <IconButton name="setting" {...defStyle} />
      <CountSelect name={name} />
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        size="small"
        onChange={(e, page) => {
          if (typeof onChangePage === "function") {
            onChangePage(name)(page);
          }
        }}
      />
    </Box>
  );
};

export default Default;
