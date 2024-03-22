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
  useCallback((data, langBase, dialog) => {
    return (
      <Box defFlex row jc_sp ai>
        <Box defFlex row ai gap>
          <Box
            strong
            onClick={() => copyText(`goodId : ${data?.id}`)}
            help={{ name: "number" }}
          >
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
          <IconButtonEdit langBase={dialog} data={data} />
          <IconButtonDelete langBase={dialog} data={data} />
        </Box>
      </Box>
    );
  }, []);

export default useRenderRow;
