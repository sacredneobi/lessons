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
  useCallback((data, dialog) => {
    return (
      <Box flex row jc_sp ai>
        <Box flex row ai gap>
          <Box
            strong
            onClick={() => copyText(`goodId : ${data?.id}`)}
            help={{ name: "number" }}
          >
            {data.id}
          </Box>
          <Box flex>
            <Text name="caption" value={data.caption} />
            <Text
              name="description"
              value={
                data.description?.length > 80
                  ? data.description.slice(0, 80) + "..."
                  : data.description
              }
              sx={{ fontSize: 12, color: "text.secondary" }}
            />
          </Box>
        </Box>
        <Box flex row>
          <DividerVertical />
          <IconButtonEdit langBase={dialog} data={data} />
          <IconButtonDelete langBase={dialog} data={data} />
        </Box>
      </Box>
    );
  }, []);

export default useRenderRow;
