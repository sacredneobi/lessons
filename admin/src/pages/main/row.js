import { Box, Divider, IconButton } from "@components";
import { dispatchEdit, dispatchDelete } from "@utils";
import { useCallback } from "react";

const useRenderRow = () =>
  useCallback(
    (data, langBase) => (
      <Box defFlex row jc="space-between" ai>
        <Box defFlex>
          <Box>{data.caption}</Box>
          <Box sx={{ fontSize: 12, color: "text.secondary" }}>
            {data.caption2}
          </Box>
        </Box>
        <Box defFlex row>
          <Divider orientation="vertical" flexItem sx={{ mr: 0.5, my: 0.5 }} />
          <IconButton
            name="edit"
            onClick={() => {
              dispatchEdit(langBase, data);
            }}
            sxIcon={{ fontSize: 18 }}
          />
          <IconButton
            name="delete"
            onClick={() => {
              dispatchDelete(langBase, data);
            }}
            sxIcon={{ fontSize: 18, color: "warning.main" }}
          />
        </Box>
      </Box>
    ),
    []
  );

export default useRenderRow;
