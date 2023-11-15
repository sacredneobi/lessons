import { Checkbox } from "@mui/material";
import { Box } from "..";
import { memo, useEffect, useState } from "react";
import { useTable } from "@context";
import { addEvent, dispatch } from "@utils";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked &&
    prev.setChecked === next.setChecked &&
    prev.onItemRender === next.onItemRender &&
    prev.langBase === next.langBase &&
    JSON.stringify(prev.item ?? {}) === JSON.stringify(next.item ?? {});
  return result;
}

const Checker = (props) => {
  const { id, name } = props;

  const [show, setShow] = useState(false);

  const tableData = useTable();

  const [checked, setChecked] = useState(tableData.selected[id] ?? false);

  useEffect(() => {
    return addEvent(`${name}.selectClear`, () => {
      setChecked(false);
    });
  }, [name]);

  useEffect(() => {
    return addEvent(`${name}.showCheckbox`, (detail) => {
      setShow(detail?.show);
    });
  }, [name]);

  const handleOnChange = () => {
    setChecked((prev) => {
      if (!prev) {
        tableData.selected[id] = !prev;
      } else {
        delete tableData.selected[id];
      }
      dispatch(`${name}.selectChange`, {});
      return !prev;
    });
  };

  if (!show) {
    return null;
  }

  return <Checkbox checked={checked} onChange={handleOnChange} />;
};

const Default = memo((props) => {
  const { item, name, onItemRender, langBase } = props;
  const { id, caption } = item ?? {};

  return (
    <Box defFlex row sx={{ minHeight: 32, p: 0.5 }} ai>
      <Checker id={id} name={name} />
      {typeof onItemRender === "function" ? (
        <Box defFlex jc sx={{ width: "100%" }}>
          {onItemRender(item, langBase)}
        </Box>
      ) : (
        caption
      )}
    </Box>
  );
}, areEqual);

export default Default;
