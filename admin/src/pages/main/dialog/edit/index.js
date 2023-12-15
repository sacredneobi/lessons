import { Tabs, DialogContent } from "@components";
import { useAction, useDef, useDialogDef } from "@utils";
import { useState } from "react";
import Setting from "./setting";
import Price from "./price";

const tabs = [
  { name: "setting", validate: ["caption"] },
  { name: "price", validate: ["price"] },
];

const Default = (props) => {
  const { langBase, data: oldData } = props;

  const [data, setData] = useState(oldData);
  const { dialogData, OnDialogChange } = useDialogDef(langBase);

  const handleOnChange = useAction(setData);
  const def = useDef(data, handleOnChange);

  return (
    <>
      <Tabs items={tabs} tabs={dialogData?.tabs} onChange={OnDialogChange} />
      <DialogContent>
        {dialogData?.tabs === 0 && <Setting def={def} />}
        {dialogData?.tabs === 1 && <Price def={def} />}
      </DialogContent>
    </>
  );
};

export default Default;
