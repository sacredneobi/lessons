import { DialogDelete, DialogEdit } from "@components";
import Container from "./edit";

const Default = (props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit langBase={langBase} container={<Container />} />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
