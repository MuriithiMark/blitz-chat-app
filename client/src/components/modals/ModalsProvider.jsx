import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modals-provider.scss";
import { closeModal } from "../../features/modals/modal.slice";
import GroupForm from "../forms/group/GroupForm";

const ModalsProvider = () => {
  const modals = [
    {
      name: "create-group-form",
      isOpen: true,
      Component: GroupForm,
    },
  ];

  const dispatch = useDispatch();

  const currentModal = useSelector((state) => state.modals);

  const handleClose = async () => {
    dispatch(closeModal(currentModal));
  };

  return (
    <div
      className={`modals-wrapper ${currentModal ? "" : "hidden"}`}
      onClick={handleClose}
    >
      {modals.map((modal) => {
        const Component = modal.Component;
        return (
          <div
            key={modal.name}
            onClick={(event) => event.stopPropagation()}
            className={`modal-container ${
              currentModal === modal.name ? "" : "hidden"
            }`}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
};

export default ModalsProvider;
