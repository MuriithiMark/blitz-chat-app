import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

import "./create-group-form.scss";
import useFormState from "../../../hooks/useFormState";
import { createNewGroup } from "../../../features/groups/groups.slice";
import { toggleCreateGroup } from "../../../features/modals/modal.slice";

const CreateGroupForm = () => {
  const { data, handleChange, reset } = useFormState({
    name: "",
    about: "",
  });
  const dispatch = useDispatch()

  const handleCreateGroup = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post("/groups", data);
      dispatch(createNewGroup(response.data.group));
      dispatch(toggleCreateGroup())
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreateGroup}>
        <label htmlFor="name">
          About
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Group Name"
          />
        </label>
        <label htmlFor="about">
          About
          <input
            type="text"
            name="about"
            value={data.about}
            onChange={handleChange}
            placeholder="describe more about your group"
          />
        </label>
        {/* <label htmlFor="groupMembers">
          Members
          <select name="groupMembers" multiple>
            {
              // map through friends
              Array(10).fill(0).map((_, idx) => (
                <option key={idx} value={"Test"}>Hello</option>
              ))
            }
          </select>
        </label> */}

        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
