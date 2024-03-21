import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./group-form.scss";
import useFormState from "../../../hooks/useFormState.hook";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../features/modals/modal.slice";

const GroupForm = () => {
  const [data, handleChange, reset] = useFormState({
    name: "",
    about: "",
  });

  const [currentUser, isLoading] = useAuthenticatedUser();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  if (isLoading) {
    return <div></div>;
  }

  if (!currentUser) {
    dispatch(closeModal())
    // return navigate("/auth/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/groups", data);
      dispatch(closeModal())
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    try {
        const input = confirm("Are you sure?")
        if(!input) return;
        dispatch(closeModal())
    } catch (error) {
        
    }
  } 

  return (
    <div className="group-form-container">
        <div className="group-form-header">
            <h2>Create a New Group</h2>
        </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <label>
          About
          <input
            type="text"
            name="about"
            value={data.about}
            onChange={handleChange}
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-create-group">Create Group</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default GroupForm;
