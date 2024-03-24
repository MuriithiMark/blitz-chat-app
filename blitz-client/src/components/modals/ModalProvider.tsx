import { useDispatch, useSelector } from "react-redux";

import "./modal-provider.scss";
import { RootState } from "../../features/store.ts";
import Login from "../auth/login/Login.tsx";
import Register from "../auth/register/Register.tsx";
import { closeAllModals } from "../../features/modals/modal.slice.ts";
import CreateGroupForm from "../group/create-group-form/CreateGroupForm.tsx";
import AddGroupMembers from "../group/add-group-members/AddGroupMembers.tsx";

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
        <div
          className="modal-container"
          onClick={() => dispatch(closeAllModals())}
        >
          <div
            className="modal-wrapper"
            onClick={(event) => event.stopPropagation()}
          >
            <Register />
          </div>
        </div>
      )}
      {modal.create_group.open && (
        <div
          className="modal-container"
          onClick={() => dispatch(closeAllModals())}
        >
          <div
            className="modal-wrapper"
            onClick={(event) => event.stopPropagation()}
          >
            <CreateGroupForm />
          </div>
        </div>
      )}
      {modal.add_group_members.open && (
        <div
          className="modal-container"
          onClick={() => dispatch(closeAllModals())}
        >
          <div
            className="modal-wrapper"
            onClick={(event) => event.stopPropagation()}
          >
            <AddGroupMembers />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProvider;
