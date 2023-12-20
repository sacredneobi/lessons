import { useGoodGetById } from "@api";
import { DialogDelete, DialogEdit } from "@components";
import { areEqualObject } from "@utils";
import { memo, useCallback, useMemo, useState } from "react";
import Container from "./edit";

const useData = () => {
  const [loading, setLoading] = useState(false);

  const [callbackGet, loadingGet] = useGoodGetById();

  const handleOnPost = useCallback((data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleOnEdit = useCallback((data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handelOnGet = useCallback(
    (data, onClose) => {
      callbackGet(data, onClose);
    },
    [callbackGet]
  );

  const result = useMemo(() => {
    return {
      useData: {
        onGet: handelOnGet,
        onEdit: handleOnEdit,
        onPost: handleOnPost,
      },
    };
  }, [handelOnGet, handleOnEdit, handleOnPost]);

  result.loading = loading || loadingGet;

  return result;
};

const Default = memo((props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container langBase={`${langBase}.dialog.edit`} />}
        sxDialogContent={{ minHeight: 250, height: 300, maxHeight: 400 }}
        {...useData()}
        needLoading
      />
      <DialogDelete langBase={langBase} />
    </>
  );
}, areEqualObject);

export default Default;
