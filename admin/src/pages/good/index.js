import { Box, Button } from "@components";
import { useRootSetting } from "@context";

const Default = () => {
  const context = useRootSetting();

  return (
    <Box defFlex center sx={{ width: "100%", height: "100%" }}>
      HELLO
      <Button
        caption={context.userAuth ? "isAuth" : "not auth"}
        onClick={() => {
          context.userAuth = true;
        }}
      />
    </Box>
  );
};

export { Default as PageGood };
