const { ToggleButtonGroup, ToggleButton } = require("@mui/material");

const Default = (props) => {
  const { value, onChange, items, sx, clear, name, ...other } = props;

  return (
    <ToggleButtonGroup
      size="large"
      exclusive
      value={value}
      sx={{ "& .MuiButtonBase-root": { borderRadius: 2, py: 0.75 }, ...sx }}
      onChange={(_, value) => {
        if (typeof onChange === "function") {
          onChange(name)(value);
        }
      }}
      {...other}
    >
      {items.map((item) => (
        <ToggleButton key={item.id} value={item.id}>
          {item.caption}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export { Default as ButtonGroup };
