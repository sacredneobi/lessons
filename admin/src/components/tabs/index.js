import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "./tab";

const Default = (props) => {
  const { name = "tabs", items, tabs, onChange } = props;

  const handleChange = (event, newValue) => {
    if (typeof onChange === "function") {
      onChange(name)(newValue);
    }
  };

  return (
    <Tabs
      value={tabs ?? 0}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      aria-label="visible arrows tabs example"
      sx={{
        [`& .${tabsClasses.scrollButtons}`]: {
          "&.Mui-disabled": { opacity: 0.3 },
        },
        minHeight: 32,
      }}
    >
      {items?.map((item, index) => (
        <Tab key={index} label={item.name} />
      ))}
    </Tabs>
  );
};

export { Default as Tabs };
