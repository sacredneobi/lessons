const { useState, useMemo } = require("react");
const { useActionDialog } = require("./action");

const defStoreProps = ["tabs"];

const useDialogDef = (langBase, storeProps) => {
  const newStoreProps = useMemo(() => {
    return [...defStoreProps, ...(storeProps ?? [])];
  }, [storeProps]);

  const [dialogData, setDialogData] = useState({ tabs: 0 });
  const handleOnDialogChange = useActionDialog(
    setDialogData,
    langBase,
    newStoreProps
  );

  return { dialogData, OnDialogChange: handleOnDialogChange };
};

export { useDialogDef };
