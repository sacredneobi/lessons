import { useRef } from "react";
import { Box, Divider } from "..";
import Row from "./row";

import { ViewportList } from "react-viewport-list";

const Default = (props) => {
  const { items, name, onItemRender, langBase, loading } = props;

  const ref = useRef();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto",
        willChange: "transform",
        flexGrow: 1,
        filter: `blur(${loading ? 2 : 0}px)`,
        transition: "filter 500ms linear",
      }}
    >
      <ViewportList viewportRef={ref} items={items} overscan={10}>
        {(item, index, arr) => (
          <Box defFlex key={item?.id ?? index}>
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
