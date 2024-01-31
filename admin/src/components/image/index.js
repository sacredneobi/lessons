import { Box, Button, Icon } from "@components";
import { CircularProgress, alpha } from "@mui/material";
import { useEffect, useState } from "react";

const Image = (props) => {
  const { src: srcProps, url, onChange, name, value, id, file, local } = props;

  const [src, setSrc] = useState(srcProps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        "&:hover": !loading && {
          "& img": {
            filter: "blur(4px)",
          },
        },
        ...(loading && {
          "& img": {
            filter: "blur(4px)",
          },
          minWidth: 80,
          border: ({ palette }) => `1px solid ${palette.divider}`,
        }),
        ...(error && {
          border: ({ palette }) => `1px solid ${palette.divider}`,
        }),
      }}
    >
      {error ? (
        <Box defFlex center sx={{ minWidth: 80, height: 140 }}>
          <Icon name="broken" sx={{ fontSize: 40, color: "text.secondary" }} />
        </Box>
      ) : (
        <img
          alt={url ?? "preview"}
          src={src ?? `api/media?fileId=${url}`}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onLoad={() => {
            setLoading(false);
          }}
          loading="lazy"
          style={{
            height: 140,
            objectFit: "scale-down",
            transition: "filter 200ms linear",
          }}
        />
      )}
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
          opacity: loading ? 1 : 0,
          "&:hover": !loading && {
            opacity: 1,
          },
          transition: "opacity 200ms linear",
        }}
      >
        {loading ? (
          <Box
            defFlex
            sx={{
              borderRadius: "50%",
              backgroundColor: ({ palette }) =>
                alpha(palette.primary.main, 0.6),
              p: 1,
              alignSelf: "center",
              margin: "auto",
            }}
          >
            <CircularProgress
              size={40}
              sx={{
                color: "primary.contrastText",
                animationDuration: "3s",
                "& circle": {
                  animationDuration: "8s",
                },
              }}
            />
          </Box>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};

export { Image };
