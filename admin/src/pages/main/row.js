import {
  Box,
  DividerVertical,
  IconButtonDelete,
  IconButtonEdit,
  Text,
} from "@components";
import { copyText } from "@utils";
import { useCallback } from "react";

const useRenderRow = () =>
  useCallback(
    (data, langBase) => (
      <Box defFlex row jc_sp ai>
        <Box defFlex row ai gap>
          <Box strong onClick={() => copyText(`goodId : ${data?.id}`)}>
            {data.id}
          </Box>
          <Box defFlex>
            <Text name="caption" langBase={langBase} value={data.caption} />
            <Text
              name="caption2"
              langBase={langBase}
              value={data.caption2}
              sx={{ fontSize: 12, color: "text.secondary" }}
            />
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
