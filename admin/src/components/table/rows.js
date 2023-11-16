import { useRef } from "react";
import { Box, Divider } from "..";
import Row from "./row";

import { ViewportList } from "react-viewport-list";

const Default = (props) => {
  const { items, name, onItemRender, langBase } = props;

  const ref = useRef();

  if (!Array.isArray(items) || !items.length > 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto",
        willChange: "transform",
      }}
    >
      <ViewportList viewportRef={ref} items={items} overscan={5}>
        {(item, index, arr) => (
          <Box defFlex grow key={item?.id ?? index}>
            <Row
              item={item}
              name={name}
              onItemRender={onItemRender}
              langBase={langBase}
            />
            {arr.length - 1 !== index && <Divider flexItem sx={{ my: 0.25 }} />}
          </Box>
        )}
      </ViewportList>
    </div>
  );
};

export default Default;
