import axios from "axios";

import useFormState from "../../../hooks/useFormState";

const CreateGroupForm = () => {
  const { data, handleChange, reset } = useFormState({
    name: "",
    about: "",
  });

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post("/groups", data);
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
      </form>
    </div>
  );
};

export default CreateGroupForm;
