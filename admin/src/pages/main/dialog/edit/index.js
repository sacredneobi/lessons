import { Tabs, DialogContent } from "@components";
import { useAction, useDef, useDialogDef, useValidate } from "@utils";
import Setting from "./setting";
import Price from "./price";
import Photo from "./photo";
import { useEffect } from "react";

const tabs = [
  { name: "setting", validate: ["caption"] },
  { name: "price", validate: ["price"] },
  { name: "photo" },
];

const validateFields = [{ name: "caption", notNull: true, minLength: 10 }];

const Default = (props) => {
  const { langBase, data, setData, setError, error } = props;

  const { dialogData, onDialogChange } = useDialogDef(langBase);

  const validate = useValidate(validateFields);

  useEffect(() => {
    setError(validate(data));
  }, [setError, data, validate]);

  const handleOnChange = useAction(setData);
  const def = useDef(data, handleOnChange, error);

  return (
    <>
      <Tabs
        items={tabs}
        tabs={dialogData?.tabs}
        onChange={onDialogChange}
        langBase={langBase}
        error={error}
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
