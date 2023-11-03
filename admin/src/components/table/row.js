import { Checkbox } from "@mui/material";
import { Box } from "..";
import { memo, useEffect, useState } from "react";
import { useTable } from "@context";
import { addEvent, dispatch } from "@utils";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked && prev.setChecked === next.setChecked;
  return result;
}

const Default = memo((props) => {
  const { item, name } = props;
  const { id, caption } = item ?? {};

  const tableData = useTable();

  const [checked, setChecked] = useState(tableData.selected[id] ?? false);

  useEffect(() => {
    return addEvent(`${name}.selectClear`, () => {
      setChecked(false);
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

  return (
    <Box sx={{ minHeight: 32, p: 0.5 }}>
      <Checkbox checked={checked} onChange={handleOnChange} />
      {caption}
    </Box>
  );
}, areEqual);

export default Default;
