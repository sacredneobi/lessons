import { Box, Input } from "@components";

const MyImage = (props) => {
  const { src, url } = props;

  return (
    <img
      alt={url ?? "preview"}
      src={src ?? `api/media?fileId=${url}`}
      style={{ height: 140, objectFit: "scale-down", borderRadius: 10 }}
    />
  );
};

const Default = (props) => {
  const { def } = props;

  const media = def("media")?.value;
  const selectImage = def("file")?.value;

  const isImage = !!selectImage?.preview;

  return (
    <Box defFlex gap sx={{ pt: 0.75 }}>
      <Box defFlex gap>
        <Input {...def("file")} type="file" accept="image/*" />
        <Box
          defFlex
          row
          sx={{
            flexWrap: "wrap",
            height: 300,
            overflow: "auto",
            columnGap: 1,
            rowGap: 0,
          }}
        >
          {isImage && <MyImage src={selectImage?.preview} />}
          {Array.isArray(media) &&
            media.map((item) => <MyImage key={item.id} url={item.fileId} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
