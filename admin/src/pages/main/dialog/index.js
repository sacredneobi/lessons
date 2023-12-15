import { DialogDelete, DialogEdit } from "@components";
import Container from "./edit";
import { useState, memo } from "react";
import { useGoodsGetById } from "@api";
import { areEqualObject } from "@utils";

const useData = () => {
  const [loading, setLoading] = useState(false);

  const [callbackGet] = useGoodsGetById();

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

  const handelOnGet = (data, onClose) => {
    callbackGet(data, onClose);
  };

  return {
    onPost: handleOnPost,
    onEdit: handleOnEdit,
    onGet: handelOnGet,
    loading: loading,
  };
};

const Default = memo((props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container langBase={`${langBase}.dialog.edit`} />}
        sxDialogContent={{ minHeight: 250, height: 300, maxHeight: 400 }}
        useData={useData()}
        needLoading
      />
      <DialogDelete langBase={langBase} />
    </>
  );
}, areEqualObject);

export default Default;
