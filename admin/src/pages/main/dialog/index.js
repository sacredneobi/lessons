import {
  useGoodGetById,
  useGoodUpdate,
  useGoodPost,
  useGoodDelete,
} from "@api";
import { DialogDelete, DialogEdit } from "@components";
import { areEqualObject } from "@utils";
import { memo, useCallback, useMemo } from "react";
import Container from "./edit";

const useData = () => {
  const [callbackGet, loadingGet] = useGoodGetById();
  const [callbackUpdate, loadingUpdate] = useGoodUpdate();
  const [callbackPost, loadingPost] = useGoodPost();
  const [callbackDelete, loadingDelete] = useGoodDelete();

  const handleOnPost = useCallback(
    (data, onClose) => {
      callbackPost(data, onClose);
    },
    [callbackPost]
  );

  const handleOnEdit = useCallback(
    (data, onClose) => {
      callbackUpdate(data, onClose);
    },
    [callbackUpdate]
  );

  const handelOnGet = useCallback(
    (data, onClose) => {
      callbackGet(data, onClose);
    },
    [callbackGet]
  );

  const handelOnDelete = useCallback(
    (data, onClose) => {
      callbackDelete(data, onClose);
    },
    [callbackDelete]
  );

  const result = useMemo(() => {
    return {
      useData: {
        onGet: handelOnGet,
        onEdit: handleOnEdit,
        onPost: handleOnPost,
        onDelete: handelOnDelete,
      },
    };
  }, [handelOnGet, handleOnEdit, handleOnPost, handelOnDelete]);

  result.loading = loadingGet || loadingUpdate || loadingPost || loadingDelete;

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
      <DialogDelete langBase={langBase} {...useData()} />
    </>
  );
}, areEqualObject);

export default Default;
