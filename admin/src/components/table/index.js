import { useState } from "react";
import { Box, Divider, IconButtonCreate, IconButtonReload, Stack } from "..";
import { TableContext } from "@context/table";
import { memo } from "@utils";
import Rows from "./rows";
import Bottom from "./bottom";
import { Input } from "../input";
import { useLang } from "@context";

const defStyle = { sxIcon: { fontSize: 18 } };

const Default = (props) => {
  const {
    items,
    topButtons,
    sx,
    sxHeader,
    pageCount,
    sxFooter,
    name,
    onChangePage,
    onItemRender,
    onBottomRender,
    langBase,
    loading,
    onFilter,
  } = props;

  const [search, setSearch] = useState(null);

  return (
    <Box
      name="rootTable"
      gap={0.5}
      defFlex
      sx={{
        width: 1,
        height: 2,
        ...sx,
      }}
    >
      <Box defFlex row gap name="header" ai sx={{ width: 1, ...sxHeader }}>
        <Input
          name="search"
          langBase="global.table.top"
          value={search ?? ""}
          onChange={() => setSearch}
          onClear={() => {
            if (typeof onFilter === "function") {
              onFilter(null);
            }
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13 && typeof onFilter === "function") {
              onFilter(search);
            }
          }}
          sx={{
            "& fieldset": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: !topButtons ? 10 : 4,
            },
            flexGrow: 1,
          }}
          clear
        />
        <Stack>
          <IconButtonReload />
          <IconButtonCreate />
        </Stack>
        {topButtons ? (
          typeof topButtons === "function" ? (
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
                />
              );
            })
          ) : (
            <topButtons.type
              {...topButtons.props}
              sxIcon={{ ...topButtons.props.sxIcon, ...defStyle.sxIcon }}
            />
          )
        ) : null}
      </Box>
      <Rows
        items={items ?? []}
        name={name}
        onItemRender={onItemRender}
        langBase={langBase}
        loading={loading}
      />
      <Divider flexItem />
      <Bottom
        pageCount={pageCount}
        sxFooter={sxFooter}
        name={name}
        onChangePage={onChangePage}
        defStyle={defStyle}
        onBottomRender={onBottomRender}
        langBase={langBase}
      />
    </Box>
  );
};

const ContextTable = memo((props) => {
  const { langBase: langBaseProps, ...other } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
    <TableContext>
      <Default
        {...other}
        langBase={langBase}
        sx={{ flexGrow: 1, ...other?.sx }}
      />
    </TableContext>
  );
});

export { ContextTable as Table };
