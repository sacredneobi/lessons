import { DialogDelete, DialogEdit } from "@components";

const Default = (props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit langBase={langBase} />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
