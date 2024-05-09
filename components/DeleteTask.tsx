// i want to implement component with input for delte task by id

import { useState } from "react";
import { Data } from "../types/dataTypes";

const DeleteTask: React.FC<Data> = () => {
  const [id, setId] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form :", id);
    try {
      console.log("id : ", id);
      const responce = await fetch("api/deleteTask", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });
      const data = await responce.json();
      if (data.message == "ETC Task deleted successfully") {
        console.log("ETC Task deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="id" onChange={handleChange} />
        <button>Delete Task</button>
      </form>
    </div>
  );
};

export default DeleteTask;
