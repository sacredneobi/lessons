import { Box, Image, InputFile } from "@components";

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
            <Image
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
              <Image
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
