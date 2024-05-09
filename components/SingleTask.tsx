import { Data, DataProps } from "../types/dataTypes";
import EtcTable from "../pages/EtcTable";
import { useState } from "react";

const SingleTask: React.FC<DataProps> = () => {
  const [taskDate, setTaskDate] = useState("");
  const [fetchedData, setFetchedData] = useState<Data>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(e.target.value);
    console.log(taskDate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form :", taskDate);
    try {
      const response = await fetch("/api/findOne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskDate),
      });
      const data = await response.json();
      if (data.message == "ETC Task found successfully") {
        console.log("ETC Task found successfully");
        setFetchedData(data.task[0]);
        console.log("FEtched data : ", fetchedData);
      }
    } catch (error) {
      console.error("Error finding task:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search for singleTask : </label>
        <input type="date" placeholder="ID" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SingleTask;
