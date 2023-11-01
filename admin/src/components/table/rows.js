import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Divider } from "..";
import Row from "./row";
import { dispatch } from "@utils";
import { useTable } from "@context";

const Default = (props) => {
  const { items, name } = props;

  const [checked, setChecked] = useState([]);
  const tableData = useTable();

  useEffect(() => {
    tableData.selected = checked;
    dispatch(`${name}.selectChange`, {});
  }, [checked, tableData, name]);

  if (!Array.isArray(items) || !items.length > 0) {
    return null;
  }

  return (
    <Stack divider={<Divider flexItem sx={{ my: 0.25 }} />}>
      {items?.map((item, index) => {
        const check = !!checked.find((check) => check.id === item.id);

        return (
          <Row
            key={item?.id ?? index}
            item={item}
            checked={check}
            setChecked={setChecked}
          />
        );
      })}
    </Stack>
  );
};

export default Default;
