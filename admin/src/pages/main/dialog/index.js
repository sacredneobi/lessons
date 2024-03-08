import {
  useGoodGetById,
  useGoodUpdate,
  useGoodPost,
  useGoodDelete,
} from "@api";
import { DialogDelete, DialogEdit } from "@components";
import { areEqualObject, createMultiPart } from "@utils";
import { memo, useCallback, useMemo } from "react";
import Container from "./edit";

const useData = () => {
  const [callbackGet, loadingGet] = useGoodGetById();
  const [callbackUpdate, loadingUpdate] = useGoodUpdate();
  const [callbackPost, loadingPost] = useGoodPost();
  const [callbackDelete, loadingDelete] = useGoodDelete();

  const handleOnPost = useCallback(
    (data, onClose) => {
      callbackPost(createMultiPart(data, ["file"]), onClose);
    },
    [callbackPost]
  );

  const handleOnEdit = useCallback(
    (data, onClose) => {
      callbackUpdate(createMultiPart(data, ["file"]), onClose);
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
  return (
    <>
      <DialogEdit
        container={<Container />}
        sxDialogContent={{ minHeight: 250, height: 420 }}
        {...useData()}
        needLoading
        {...props}
      />
      <DialogDelete {...useData()} {...props} />
    </>
  );
}, areEqualObject);

export default Default;
