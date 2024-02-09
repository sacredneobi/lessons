import { Box, Button, Input, Text } from "@components";
import { getHashText, useAction } from "@utils";
import { useState } from "react";
import { useAuth } from "@api";
import { useRootSetting } from "@context";

// const langBase = "login";

const Default = (props) => {
  const [data, setData] = useState(null);

  const handelOnChange = useAction(setData);
  const [callbackAuth, loading] = useAuth();

  const context = useRootSetting();

  const handelOnAuth = async () => {
    const { password, ...other } = data;

    other.password = await getHashText(password);
    console.log(other.password);

    callbackAuth(other, (data) => {
      if (data?.accessToken) {
        context.userAuth = true;
        localStorage.setItem("token", data?.accessToken);
      }
    });
  };

  const def = (name) => ({
    name,
    caption: name,
    // langBase,
    clear: true,
    onChange: handelOnChange,
    value: data?.[name],
    sxIcon: {
      color: "#f8f4fa",
    },
    sx: {
      "& label.Mui-focused": {
        color: "#f8f4fa",
      },
      "& label": {
        color: "#f8f4fa",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#ffbe37",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ffbe37",
        },
        "&:hover fieldset": {
          borderColor: "#ffbe37",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ffbe37",
        },
      },
    },
  });

  return (
    <Box
      defFlex
      grow
      center
      sx={{
        background: "url(/res/img/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        defFlex
        gap
        sx={{
          pt: 1,
          px: 2,
          pb: 2,
          borderRadius: 3,
          width: "40vw",
          maxWidth: 700,
          minWidth: 400,
          backdropFilter: "blur(4px)",
          boxShadow: (theme) => theme.shadows[5],
          border: ({ palette }) => `1px solid ${palette.divider}`,
        }}
      >
        <Box defFlex center>
          <img src="/res/img/logo.png" width={150} height={150} alt="login" />
        </Box>
        <Input {...def("login")} disabled={loading} nextField="password" />
        <Input
          {...def("password")}
          type="password"
          disabled={loading}
          nextField="login"
          onCheckNext={() => {
            return !!data?.login;
          }}
          onNextField={() => {
            handelOnAuth();
          }}
        />
        <Box defFlex row gap jc="space-between" ai>
          <Text caption="v0.1" sx={{ color: "text.secondary", fontSize: 12 }} />
          <Button
            color="secondary"
            caption="Войти"
            onClick={handelOnAuth}
            sx={{ width: "40%", height: 35 }}
            disabled={!(data?.login && data?.password) || loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
