import { useState } from "react";
import {
  Checkbox,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Divider, IconButton } from "..";

const defStyle = { sxIcon: { fontSize: 18 } };

const Default = (props) => {
  const {
    items,
    pageCount,
    topButtons,
    onSearch,
    sx,
    sxHeader,
    sxTable,
    sxFooter,
    name,
    onChangePage,
  } = props;

  const [search, setSearch] = useState(null);
  const [checked, setChecked] = useState([]);

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
        {typeof topButtons === "function" ? (
          topButtons(defStyle)
        ) : typeof topButtons.props.children === "function" ? (
          topButtons.props.children(defStyle)
        ) : Array.isArray(topButtons.props.children) ? (
          topButtons.props.children.map((item) => {
            if (typeof item === "function") {
              return item(defStyle);
            }

            return (
              <item.type
                {...item.props}
                sxIcon={{ ...item.props.sxIcon, ...defStyle.sxIcon }}
                onClick={(e) => {
                  console.log(item.props);
                }}
              />
            );
          })
        ) : (
          <topButtons.type
            {...topButtons.props}
            sxIcon={{ ...topButtons.props.sxIcon, ...defStyle.sxIcon }}
          />
        )}
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
                minHeight: 32,
                p: 0.5,
              }}
            >
              <Checkbox
                checked={!!checked.find((check) => check.id === item.id)}
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
          ))}
        </Stack>
      </Box>
      <Divider flexItem />
      <Box defFlex row jc="space-between" ai name="footer" sx={sxFooter}>
        <IconButton name="setting" {...defStyle} />
        {checked.length > 0 ? (
          <Typography>Выделенные элементы : {checked.length}</Typography>
        ) : null}
        <Pagination
          count={pageCount}
          variant="outlined"
          shape="rounded"
          size="small"
          onChange={(e, page) => {
            if (typeof onChangePage === "function") {
              onChangePage(name)(page);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export { Default as Table };
