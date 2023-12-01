import { DialogDelete, DialogEdit } from "@components";
import Container from "./edit";

const Default = (props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container langBase={`${langBase}.dialog.edit`} />}
        sxDialogContent={{ minHeight: 250, maxHeight: 400 }}
      />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
