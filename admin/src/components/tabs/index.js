import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "./tab";
import { LangContext, useLang } from "@context";

const Default = (props) => {
  const { name = "tabs", items, tabs, onChange, error } = props;

  const { lang } = useLang();

  const handleChange = (event, newValue) => {
    if (typeof onChange === "function") {
      onChange(name)(newValue);
    }
  };

  return (
    <LangContext lang={`${lang}.tabs`}>
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
        {items?.map((item, index) => {
          let isError = false;

          if (Array.isArray(item?.validate)) {
            isError =
              item.validate
                .map((item) => !!error?.fields?.[item])
                .filter(Boolean)?.length > 0;
          }

          return <Tab key={index} {...item} isError={isError} />;
        })}
      </Tabs>
    </LangContext>
  );
};

export { Default as Tabs };
