import React, { SetStateAction } from "react";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
};

const useNavbar = ({ setShowDeleteWarning }: Props) => {
  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  return { handleDelete };
};

export default useNavbar;
