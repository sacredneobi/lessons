import { Box, IconButton, Table } from "@components";

const testArr = new Array(50)
  .fill(1)
  .map((_, index) => ({ id: index, caption: `test ${index}` }));

const Default = () => {
  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        name="goods"
        sx={{ flexGrow: 1 }}
        items={testArr}
        topButtons={
          <>
            <IconButton name="filter" />
            <IconButton name="filter" />
            {(props) => {
              return <IconButton name="filter" {...props} />;
            }}
          </>
        }
        pageCount={20}
        onChangePage={(name) => (page) => {
          console.log(name, page);
        }}
      />
    </Box>
  );
};

export { Default as PageMain };
