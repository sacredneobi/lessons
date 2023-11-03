import { useState } from "react";
import { TextField } from "@mui/material";
import { Box, Divider } from "..";
import { TableContext } from "@context/table";
import Rows from "./rows";
import Bottom from "./bottom";

const defStyle = { sxIcon: { fontSize: 18 } };

const Default = (props) => {
  const {
    items,
    topButtons,
    onSearch,
    sx,
    sxHeader,
    sxTable,
    pageCount,
    sxFooter,
    name,
    onChangePage,
  } = props;

  const [search, setSearch] = useState(null);

  return (
    <Box name="rootTable" gap={0.5} defFlex sx={{ width: 1, height: 2, ...sx }}>
      <Box defFlex row gap name="header" sx={{ width: 1, ...sxHeader }}>
        <TextField
          value={search ?? ""}
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
          topButtons.props.children.map((item, index) => {
            if (typeof item === "function") {
              return item({ ...defStyle, key: item.props?.id ?? index });
            }

            return (
              <item.type
                key={item.props?.id ?? index}
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
        <Rows items={items} name={name} />
      </Box>
      <Divider flexItem />
      <Bottom
        pageCount={pageCount}
        sxFooter={sxFooter}
        name={name}
        onChangePage={onChangePage}
        defStyle={defStyle}
      />
    </Box>
  );
};

const ContextTable = (props) => {
  console.log("render root table");
  return (
    <TableContext>
      <Default {...props} />
    </TableContext>
  );
};

export { ContextTable as Table };
