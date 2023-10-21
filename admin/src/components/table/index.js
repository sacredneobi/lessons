import { useState } from "react";
import { Pagination, Stack, TextField } from "@mui/material";
import { Box, Button, Divider } from "..";

const Default = (props) => {
  const { items, topButtons, onSearch, sx, sxHeader, sxTable, sxFooter } =
    props;

  const [search, setSearch] = useState(null);

  return (
    <Box name="rootTable" gap={0.5} defFlex sx={{ width: 1, height: 2, ...sx }}>
      <Box defFlex row gap name="header" sx={{ width: 1, ...sxHeader }}>
        <TextField
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onKeyUp={(e) => {
            if (e.keyChar === 13) {
              if (typeof onSearch === "function") {
                onSearch(search);
              }
            }
          }}
          sx={{
            "& fieldset": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: !topButtons ? 10 : 4,
            },
            flexGrow: 1,
          }}
          size="small"
        />
        {topButtons}
      </Box>
      <Box
        defFlex
        grow
        name="table"
        sx={{ overflow: "auto", p: 0.25, ...sxTable }}
      >
        <Stack divider={<Divider flexItem sx={{ my: 0.25 }} />}>
          {items?.map((item, index) => (
            <Box
              key={item?.id ?? index}
              sx={{
                // borderRadius: 2,
                minHeight: 32,
                p: 0.5,
                // border: ({ palette }) => `1px solid ${palette.divider}`,
              }}
            >
              {item?.caption}
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider flexItem />
      <Box defFlex row jc="space-between" name="footer" sx={sxFooter}>
        <Button caption="S" sx={{ borderBottomLeftRadius: 10 }} />
        <Pagination
          count={(items?.length ?? 0) / 50}
          variant="outlined"
          shape="rounded"
          size="small"
          boundaryCount={0}
        />
      </Box>
    </Box>
  );
};

export { Default as Table };
