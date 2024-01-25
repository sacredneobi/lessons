import { Box, Button, Icon, InputFile } from "@components";
import { useEffect, useState } from "react";

const MyImage = (props) => {
  const { src: srcProps, url, onChange, name, value, id, file, local } = props;

  const [src, setSrc] = useState(srcProps);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (...arg) => {
        setSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Box
      defFlex
      jc
      sx={{
        position: "relative",
        maxHeight: 140,
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          "& img": {
            filter: "blur(4px)",
          },
        },
      }}
    >
      <img
        alt={url ?? "preview"}
        src={src ?? `api/media?fileId=${url}`}
        style={{
          height: 140,
          objectFit: "scale-down",
          transition: "filter 200ms linear",
        }}
      />
      <Box
        defFlex
        ai="flex-end"
        sx={{
          position: "absolute",
          top: 0,
          p: 1,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          opacity: 0,
          "&:hover": {
            opacity: 1,
          },
          transition: "opacity 200ms linear",
        }}
      >
        <Button
          sx={{ borderRadius: "50%", minWidth: 2, p: 1 }}
          color="warning"
          onClick={(e) => {
            if (typeof onChange === "function") {
              e.stopPropagation();

              if (local) {
                onChange(name)(value.filter((item) => item.id !== id));
                return;
              }

              if (Array.isArray(value)) {
                value.forEach((item) => {
                  if (item.id === id) {
                    item.isDelete = true;
                  }
                });
                onChange(name)(value);
              } else {
                onChange(name)(null);
              }
            }
          }}
        >
          <Icon name="delete" sx={{ fontSize: 18 }} />
        </Button>
      </Box>
    </Box>
  );
};

const Default = (props) => {
  const { def } = props;

  const media = def("media")?.value;

  return (
    <Box defFlex gap grow sx={{ pt: 0.75 }}>
      <InputFile {...def("file")} type="file" accept="image/*" multiple />
      <Box
        defFlex
        row
        grow
        sx={{
          flexWrap: "wrap",
          height: 300,
          overflow: "auto",
          columnGap: 1,
          rowGap: 1,
          alignContent: "flex-start",
        }}
      >
        {Array.isArray(def("file")?.value) &&
          def("file").value.map((item) => (
            <MyImage
              local
              key={item?.id}
              src={item?.preview}
              file={item?.data}
              id={item?.id}
              {...def("file")}
            />
          ))}
        {Array.isArray(media) &&
          media
            .filter((item) => !item.isDelete)
            .map((item) => (
              <MyImage
                key={item.id}
                url={item.fileId}
                id={item.id}
                {...def("media")}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Default;
