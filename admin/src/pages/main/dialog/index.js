import { DialogDelete, DialogEdit } from "@components";
import Container from "./edit";
import { useState } from "react";

const useData = () => {
  const [loading, setLoading] = useState(false);

  const handleOnPost = (data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleOnEdit = (data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return { onPost: handleOnPost, onEdit: handleOnEdit, loading };
};

const Default = (props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container langBase={`${langBase}.dialog.edit`} />}
        sxDialogContent={{ minHeight: 250, maxHeight: 400 }}
        useData={useData()}
      />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
