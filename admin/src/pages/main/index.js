import { Box, Button, Table } from "@components";

const Default = () => {
  return (
    <Box name="main" defFlex center sx={{ width: "100%", height: "100%" }}>
      <Table
        sx={{ flexGrow: 1 }}
        items={new Array(50)
          .fill(1)
          .map((_, index) => ({ id: index, caption: `test ${index}` }))}
        topButtons={
          <>
            <Button caption="T" sx={{ borderTopRightRadius: 10 }} />
          </>
        }
      />
    </Box>
  );
};

export { Default as PageMain };
