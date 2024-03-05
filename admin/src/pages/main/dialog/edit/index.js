import { Tabs, DialogContent } from "@components";
import { useAction, useDef, useDialogDef } from "@utils";
// import { useState } from "react";
import Setting from "./setting";
import Price from "./price";
import Photo from "./photo";

const tabs = [
  { name: "setting", validate: ["caption"] },
  { name: "price", validate: ["price"] },
  { name: "photo" },
];

const Default = (props) => {
  const { langBase, data, setData } = props;

  const { dialogData, onDialogChange } = useDialogDef(langBase);

  const handleOnChange = useAction(setData);
  const def = useDef(data, handleOnChange);

  return (
    <>
      <Tabs
        items={tabs}
        tabs={dialogData?.tabs}
        onChange={onDialogChange}
        langBase={langBase}
      />
      <DialogContent>
        {dialogData?.tabs === 0 && <Setting def={def} />}
        {dialogData?.tabs === 1 && <Price def={def} />}
        {dialogData?.tabs === 2 && <Photo def={def} setData={setData} />}
      </DialogContent>
    </>
  );
};

export default Default;
