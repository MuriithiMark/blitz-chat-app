import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal-provider.scss";
import { RootState } from "../../features/store.ts";
import Login from "../auth/login/Login.tsx";
import Register from "../auth/register/Register.tsx";
import { closeAllModals } from "../../features/modals/modal.slice.ts";
import CreateGroupForm from "../group/create-group-form/CreateGroupForm.tsx";

const ModalProvider = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {modal.login.open && (
        <div
          className="modal-container"
          onClick={() => dispatch(closeAllModals())}
        >
          <div
            className="modal-wrapper"
            onClick={(event) => event.stopPropagation()}
          >
            <Login />
          </div>
        </div>
      )}
      {modal.register.open && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <Register />
          </div>
        </div>
      )}
      {modal.create_group.open && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <CreateGroupForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProvider;
