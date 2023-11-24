import {
  Box,
  DividerVertical,
  IconButtonDelete,
  IconButtonEdit,
} from "@components";
import { useCallback } from "react";

const useRenderRow = () =>
  useCallback(
    (data, langBase) => (
      <Box defFlex row jc_sp ai>
        <Box defFlex>
          <Box>{data.caption}</Box>
          <Box sx={{ fontSize: 12, color: "text.secondary" }}>
            {data.caption2}
          </Box>
        </Box>
        <Box defFlex row>
          <DividerVertical />
          <IconButtonEdit langBase={langBase} data={data} />
          <IconButtonDelete langBase={langBase} data={data} />
        </Box>
      </Box>
    ),
    []
  );

export default useRenderRow;
