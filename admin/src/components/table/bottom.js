import { Pagination, Typography } from "@mui/material";
import { Box } from "..";
import { useTable } from "@context";
import { useEffect, useState } from "react";
import { addEvent } from "@utils";
import Popover from "./popover";

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

  useEffect(
    () =>
      addEvent(`${name}.selectClear`, () => {
        setReload((prev) => !prev);
        tableData.selected = {};
      }),
    [name, tableData]
  );

  const count = Object.keys(tableData?.selected ?? {}).length;

  return count > 0 ? (
    <Typography>Выделенные элементы : {count}</Typography>
  ) : null;
};

const Default = (props) => {
  const { pageCount, sxFooter, name, onChangePage, defStyle, onBottomRender } =
    props;

  return (
    <Box defFlex row jc="space-between" ai name="footer" sx={sxFooter}>
      <Popover
        onBottomRender={onBottomRender}
        defStyle={defStyle}
        name={name}
      />
      <CountSelect name={name} />
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        size="small"
        onChange={(e, page) => {
          if (typeof onChangePage === "function") {
            onChangePage(name)(page - 1);
          }
        }}
      />
    </Box>
  );
};

export default Default;
