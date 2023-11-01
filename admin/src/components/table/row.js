import { Checkbox } from "@mui/material";
import { Box } from "..";
import { memo } from "react";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked && prev.setChecked === next.setChecked;
  return result;
}

const Default = memo((props) => {
  const { item, checked, setChecked } = props;

  return (
    <Box sx={{ minHeight: 32, p: 0.5 }}>
      <Checkbox
        checked={checked}
        onChange={({ target }) => {
          if (target.checked) {
            setChecked((prev) => {
              prev.push(item);
              return [...prev];
            });
          } else {
            setChecked((prev) => {
              return prev.filter((check) => check.id !== item.id);
            });
          }
        }}
      />
      {item?.caption}
    </Box>
  );
}, areEqual);

export default Default;
