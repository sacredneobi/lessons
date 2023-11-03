import { Stack } from "@mui/material";
import { Divider } from "..";
import Row from "./row";

const Default = (props) => {
  const { items, name } = props;

  if (!Array.isArray(items) || !items.length > 0) {
    return null;
  }

  return (
    <Stack divider={<Divider flexItem sx={{ my: 0.25 }} />}>
      {items?.map((item, index) => (
        <Row key={item?.id ?? index} item={item} name={name} />
      ))}
    </Stack>
  );
};

export default Default;
