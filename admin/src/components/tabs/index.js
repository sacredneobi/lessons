import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "./tab";
import { Text } from "../text";

const Default = (props) => {
  const { name = "tabs", items, tabs, onChange, langBase } = props;

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
      sx={{
        [`& .${tabsClasses.scrollButtons}`]: {
          "&.Mui-disabled": { opacity: 0.3 },
        },
        minHeight: 32,
      }}
    >
      {items?.map((item, index) => (
        <Tab
          key={index}
          label={<Text name={item.name} langBase={`${langBase}.tabs`} />}
        />
      ))}
    </Tabs>
  );
};

export { Default as Tabs };
