import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "./tab";
import { useLocal } from "../text";

const Default = (props) => {
  const { name = "tabs", items, tabs, onChange, langBase } = props;

  const handleChange = (event, newValue) => {
    if (typeof onChange === "function") {
      onChange(name)(newValue);
    }
  };

  const Text = useLocal(`${langBase}.tabs`);

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
        <Tab key={index} label={<Text name={item.name} />} />
      ))}
    </Tabs>
  );
};

export { Default as Tabs };
