import { useUserGetById } from "@api";
import {
  Box,
  ButtonGroup,
  Divider,
  Icon,
  IconButton,
  Loading,
  Text,
} from "@components";
import { useRootSetting } from "@context";
import { dispatch, useAction, useDef } from "@utils";
import { useCallback, useEffect, useState } from "react";

const Default = () => {
  const [data, setData] = useState({
    theme: localStorage.getItem("theme") ?? "system",
  });

  const [user, setUser] = useState(null);

  const [callbackGet, loading] = useUserGetById();

  const context = useRootSetting();

  const userId = context.token?.id;

  useEffect(() => {
    callbackGet({ id: userId }, setUser);
  }, [userId, callbackGet]);

  const handleOnSave = useCallback((name, value) => {
    if (name === "theme") {
      localStorage.setItem(name, value);
      dispatch(name, value);
    }
    return value;
  }, []);

  const handleOnChange = useAction(setData, handleOnSave);
  const def = useDef(data, handleOnChange);

  return (
    <Box defFlex sx={{ borderRadius: 2 }} gap>
      <Box defFlex row>
        {loading || !user ? (
          <Loading size={27} />
        ) : (
          <Text
            caption={"Здравствуйте: " + user?.caption}
            sx={{ fontSize: 18 }}
          />
        )}
      </Box>
      <ButtonGroup
        {...def("theme")}
        items={[
          {
            id: "light",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeLight" />
                <Text caption="Light" />
              </Box>
            ),
          },
          {
            id: "system",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeSystem" />
                <Text caption="System" />
              </Box>
            ),
          },
          {
            id: "dark",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeDark" />
                <Text caption="Dark" />
              </Box>
            ),
          },
        ]}
      />
      <Box grow />
      <Box defFlex>
        <Divider flexItem sx={{ my: 1.5, mb: 1.375 }} />
        <IconButton
          name="logout"
          sx={{ alignSelf: "flex-end" }}
          onClick={() => {
            context.userAuth = false;
          }}
        />
      </Box>
    </Box>
  );
};

export { Default as PageSettings };
