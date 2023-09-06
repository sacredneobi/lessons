import { Box, Divider, MenuButton, Text } from "@components";

const MyButton = (props) => {
  const { name } = props;

  return (
    <MenuButton
      caption={<Text caption={name} />}
      sx={{ justifyContent: "flex-start" }}
    />
  );
};

const Default = () => {
  return (
    <Box defFlex grow row sx={{ p: 1 }}>
      <Box
        defFlex
        sx={{ width: 240, borderRadius: 4, border: "1px solid #333" }}
        gap
      >
        <Box sx={{ height: 60 }}></Box>
        <Divider />
        <Box defFlex sx={{ p: 1 }} gap={1.5} grow>
          <MyButton name="home" />
          <MyButton name="Portfolio" />
        </Box>
        <Box defFlex sx={{ p: 1 }}>
          <MyButton name="Close" />
        </Box>
      </Box>
      <Box grow />
    </Box>
  );
};

export { Default as Dashboard };
